#!/usr/bin/env node
// One-off tool: prints a card-background color for each project screenshot.
//
// The 4 images are map/data screenshots on near-white basemaps, so a plain
// average or "most populous cluster" color (sharp's built-in stats().dominant)
// just returns the basemap's off-white for 3 of them -- not useful as a
// background. Instead: skip near-gray/white/black pixels, bucket the
// remaining chromatic pixels by hue, and pick the bucket that best balances
// saturation against population (floored at 5% of chromatic pixels, so a
// handful of stray saturated pixels can't outscore the real accent color).
//
// Not wired into `npm run build` -- these 4 projects are hardcoded in
// src/routes/(site)/projects/+page.svelte, so re-run this manually and paste
// the printed hsl() values into that file's markup when a project image changes.
import sharp from 'sharp'

const SIZE = 64
const HUE_BUCKET_DEGREES = 15
const ACHROMATIC_SATURATION = 0.12
const MIN_POPULATION_SHARE = 0.05
const MIN_LIGHTNESS = 0.5
const MAX_LIGHTNESS = 0.8

const FILES = [
	'static/images/post_images/peru-spatial-index.gif',
	'static/images/post_images/latam-carto-qresize.png',
	'static/images/post_images/peru-earthquakes-qresize.png',
	'static/images/post_images/missing-child-qresize.png'
]

function rgbToHsl(r, g, b) {
	r /= 255
	g /= 255
	b /= 255
	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	const l = (max + min) / 2
	const d = max - min
	if (d === 0) return { h: 0, s: 0, l }
	const s = d / (1 - Math.abs(2 * l - 1))
	let h
	switch (max) {
		case r:
			h = ((g - b) / d) % 6
			break
		case g:
			h = (b - r) / d + 2
			break
		default:
			h = (r - g) / d + 4
			break
	}
	h = Math.round(h * 60)
	if (h < 0) h += 360
	return { h, s, l }
}

async function dominantColor(path) {
	const { data, info } = await sharp(path, { animated: false })
		.resize(SIZE, SIZE, { fit: 'inside' })
		.removeAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true })

	const buckets = new Map() // hue bucket -> { count, sSum, lSum }

	for (let i = 0; i < data.length; i += info.channels) {
		const { h, s, l } = rgbToHsl(data[i], data[i + 1], data[i + 2])
		if (s < ACHROMATIC_SATURATION) continue
		const bucket = Math.round(h / HUE_BUCKET_DEGREES) * HUE_BUCKET_DEGREES
		const entry = buckets.get(bucket) || { count: 0, sSum: 0, lSum: 0 }
		entry.count += 1
		entry.sSum += s
		entry.lSum += l
		buckets.set(bucket, entry)
	}

	if (buckets.size === 0) return { h: 0, s: 0, l: 0.6 }

	const totalChromatic = [...buckets.values()].reduce(
		(sum, b) => sum + b.count,
		0
	)
	const qualifying = [...buckets.entries()].filter(
		([, b]) => b.count / totalChromatic >= MIN_POPULATION_SHARE
	)
	const candidates = qualifying.length > 0 ? qualifying : [...buckets.entries()]

	let best = null
	for (const [h, b] of candidates) {
		const avgS = b.sSum / b.count
		const pop = b.count / totalChromatic
		const score = avgS * 0.45 + pop * 0.55
		if (!best || score > best.score) {
			best = { h, s: avgS, l: b.lSum / b.count, score }
		}
	}

	return {
		h: best.h,
		s: best.s,
		l: Math.max(MIN_LIGHTNESS, Math.min(MAX_LIGHTNESS, best.l))
	}
}

for (const file of FILES) {
	const { h, s, l } = await dominantColor(file)
	const hsl = `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
	console.log(`${file}\t${hsl}`)
}
