/**
 * @papa/design — the shared layer between Papa Rentals and Papa Vendor.
 *
 * PRIMITIVES ONLY. Raw palette, radii, spacing, type scale, easings,
 * durations, and the icon set. Nothing here knows what "overdue" means.
 *
 * Semantic tokens (--status-*, --tap-glove, --row-h-*, sun mode) are OWNED BY
 * EACH APP. Sharing primitives is what stops the two drifting into different
 * oranges; keeping semantics local is what stops a marketplace brand refresh
 * silently changing what "overdue" looks like on a loading dock. Both
 * properties are wanted, so both layers exist.
 */
export {
  STAR_PATH,
  ICON_PATHS,
  Icon,
  IconSketchFilter,
  Avatar,
  LogoMark,
} from './icons/core.tsx'
export type { IconName } from './icons/core.tsx'
