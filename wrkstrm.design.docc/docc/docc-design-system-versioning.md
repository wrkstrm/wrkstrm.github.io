# DocC Design System: Versioning Tokens (ASCII-Sorted Alphabets)

Use this spec when you need **compact, fixed-width version tokens** that remain:

- **byte efficient** in logs and filenames
- **stable** for tooling
- **sortable** (string sort == numeric sort)

This is the recommended version schema for *model packages* and other tooling-facing artifacts.

This system explicitly supports **multiple overlapping versions** of the same package (for example,
parallel major lines, pinned transitive dependencies, and side-by-side toolchains). The goal is that
version tokens remain compact identifiers that are:

- easy to parse
- safe to compare **within the same version track**
- stable for indexing and lookup

## Core rule

If you encode integers using an alphabet whose characters are ordered by **increasing ASCII codepoint**,
then **lexicographic ordering matches numeric ordering** for fixed-width strings.

That means you can compare version tokens using simple string comparison *as long as width is fixed*.

### Important: ordering vs overlapping versions

Overlapping versions are normal in package graphs (multiple major lines can exist simultaneously).
The lexicographic ordering property is **not** meant to impose a single global order across different
compatibility tracks.

Use these tokens primarily as compact, stable identifiers. When you need compatibility semantics,
use an explicit policy (e.g. major-line selection, compatibility ranges, or resolver rules) rather
than relying on raw string comparison.

## Canonical alphabet (Wrkstrm Safe ASCII)

Wrkstrm uses an ambiguity-reduced, ASCII-sorted alphabet derived from Base58-style sets.

Canonical character sequence (must remain ASCII-sorted):

```
!#$%&*23456789@ABCDEFGHJKLMNPQRSTUVWXYZ^abcdefghijkmnopqrstuvwxyz
```

Notes:

- Excludes ambiguous characters: `0`, `O`, `1`, `l`, `I`.
- ASCII ordering is intentional so fixed-width encodings preserve sort order.
- This alphabet is implemented as:
  - `WrkstrmEmoji.EmojiRandomizer.safeASCIIAlphabet`

## Encoding

- Choose a **fixed width** for the encoded payload (for example: 3, 4, 6 digits).
- Encode an integer using base-N where N = alphabet length.
- Left-pad with the alphabet’s **first character** (`!`) to reach the fixed width.

## Token format

Prefix payloads with a leading `V`:

- `V` + `<payload>`

Where `<payload>` is a fixed-width string encoded using the canonical alphabet.

### Example (illustrative)

- Width: 4
- `V` + `!!!!` is the smallest value.

## Compatibility

- Do **not** change alphabet membership or ordering once tokens are in use.
- If you must change the alphabet, define a new schema version and keep old decoders.

## Swift tooling notes

Swift types can keep compact external keys/tokens while presenting ergonomic Swift APIs.
Use `CodingKeys` to map compact representations to proper Swift property names.
