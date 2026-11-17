# <module> — cards

<!--
The function cards for one module: its public interface, in pseudocode with types.
Copied to <project>/architecture/build/<module>/cards.md at step 1.3. This file is the source of truth for the module's interface; arch.md § Functions only indexes it.

The owner edits this file directly: types, shapes, names, whole cards. The host re-reads it before every change and never overwrites the owner's text. It asks with a `> host:` line under the card; the owner answers on a `> owner:` line or in the chat.
A card the owner hasn't confirmed ends its heading with (draft). Delete "(draft)" to confirm it.
During a build, the builder may change a card in its branch only as a recorded deviation. The change reaches main when the owner merges the module.
-->

**Provides:** <copied from arch.md § Modules, one line>
**Components:** <name> (D1) · <name> (D3)

## Shared types

Types used by more than one card in this module, or crossing an edge. Plain data only.

```
<TypeName> = { <field>: <Type>   // <meaning, units>
             , <field>: <Type> }
```

## <component name>

### <function_name>   · R1 · part: core | shell   (draft)

```
// 🟦 <function_name>(<arg>: <Type>, …) -> <Type>
// 🟦 Does: <behavior as the caller perceives it>
// 🟦 Args: <name>: <meaning, units, valid range>
// 🟦 Returns: <meaning, incl. empty or special values>
// 🟦 Side effects: <state changed, I/O, what later calls see>
// 🟦 Requires: <preconditions, call order>
// 🟦 Errors: <defined out | masked | reported how>
function_name(args):
    // 🟧 Phase 1: <what this block achieves, and why>
    <pseudocode>
    // 🟧 Phase 2: <what, and why this way and not the obvious way>
    <pseudocode>
```
