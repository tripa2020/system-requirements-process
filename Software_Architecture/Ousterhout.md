# Software Design

Ousterhout, *A Philosophy of Software Design* (2nd ed.). Page refs are the book's printed pages.

## Design Procedure (apply in order)
1. **Find the knowledge:** list the design decisions each module owns. Split by knowledge, not by execution order (Ch 5).
2. **Design it twice:** sketch 2+ radically different interfaces and pick by ease of use for callers (Ch 11).
3. **Write the interface comments first.** If one is hard to write, go back to step 2 (Ch 15).
4. **Check the red flags** at the bottom of this file. Fix the design before writing the bodies.
5. **Record cross-module decisions** in the project's design-doc history section (Ch 13).

## Complexity (Ch 2)
**Complexity:** anything about code structure that makes it hard to change or modify.

**Symptoms**
1. **Change amplification:** a simple change needs edits in many places.
2. **Cognitive load:** how much a dev has to hold in mind to make a change.
3. **Unknown unknowns ★:** not obvious which code must change.

**Causes**
1. **Dependency:** code can't be changed in isolation; other code has to change too.
   - ★ Key goal: reduce the number of deps; make the rest **simple and obvious** (one named constant or API) (§2.3).
   - Some deps are unavoidable, e.g. a communication protocol shared by sender and receiver.
2. **Obscurity:** important info isn't obvious (vague names, missing units).

Complexity comes from an accumulation of deps and obscurities, so have zero tolerance for each one (§2.4).

**Where it counts (§2.1):** system complexity = Σ (complexity of each part × time developers spend in it). Complexity in code that's rarely read or changed matters little. Focus effort on the hot paths.

## Working Code Isn't Enough (Ch 3)
- **Tactical:** focus on getting things done.
- **Strategic:** the most important job is to make future extensions easy.
- Takes **10–20% longer** at first, but saves time later.

```
progress │            ___── Strategic
         │       _.-'  _ _ _ Tactical
         │   _.-'_ -
         │ .'/
         └──────────────────── time
```
- **How:** sketch 2–3 designs per class and pick the cleanest. Fix design problems instead of patching around them (§3.2).
- **Conclusion:** small continuous improvements save immense time later.

## Techniques for Complexity: (1) Modules (Ch 4)
- **Modular design:** classes, subsystems and services that isolate deps and are relatively independent.
- **Interface:** how a module's implementation is bridged to the modules that need it.
  - **Formal:** signature, definition, parameters.
  - **Informal:** high-level behavior, what it touches, files it creates, call order. If a caller must know it, it's interface (§4.2).
- **Goal:** minimize deps between modules.
- **Abstraction:** a simplified view of an entity that omits unimportant details, e.g. a module's interface. It fails by including unimportant details or hiding important ones (§4.3).
- **API vs interface** *(my distinction, not the book's)*: the API is the formal part (callable signatures). The interface is the API plus the informal part (behavior, side effects, ordering).

**Deep modules:** simple interface, powerful functionality (§4.4).
```
┌──────────────┐ ← interface: what the module does (cost)
├──────────────┤
│implementation│ ← carries out what the interface promises (benefit)
│              │
└──────────────┘
```
- The cost to system complexity is the interface ★ *(what about module design?)*. The benefit is the functionality. Mission: shrink the interface while maximizing functionality.
- **Classitis (§4.6):** "classes should be small" produces many shallow classes, each with its own interface, and those interfaces add up to system-level complexity. Don't split a class just to make it small.

## Information Hiding (Ch 5)
- Each module encapsulates a few design decisions: the data structures and algorithms of its mechanism.
- Reduces complexity: (1) simpler interface, (2) less cognitive load. Hidden info should be **irrelevant and invisible** to users.
- **Information leakage:** one design decision shows up in multiple modules (p. 31).
  - Ask *"How do I make this knowledge affect one module?"* Then merge, or extract it behind a simple interface.
- **Temporal decomposition:** structure follows the order operations occur (p. 32). Design around **the knowledge each task needs, not the order tasks run in.**
- **Overexposure (p. 36):** an API forces callers to learn rarely used features in order to use common ones. Give the common case good defaults (§5.7).
- **Taking it too far (§5.9):** hide information only if nothing outside the module needs it. If callers need it, e.g. to tune performance, expose it.

## (6) General-Purpose Modules (Ch 6)
- Over-specialization *may be* the single greatest cause of complexity. Make classes that address a wide range of issues.
- **Goal: somewhat general-purpose.** The functionality reflects today's needs; the interface supports multiple use cases.
- Push special-case code **up** into callers or **down** into "drivers" (§6.6).
- **Eliminate special cases (§6.8):** design the normal case so edge conditions fall out of it with no extra code. E.g. represent "no selection" as an empty selection (start == end) instead of a flag that every caller has to check.

**Key questions (§6.4–6.5)**
1. **Who needs to know what, and when?** (§6.4) If callers need a detail, make it explicit.
2. **What is the simplest interface that covers my needs?** Fewer methods, without piling on arguments.
3. **How many situations will this be used in?** A method for one task is a red flag.
4. **Is the API easy to use for my current cases?** If it needs lots of glue code, it's too general.

## Ch 7: Different Layer, Different Abstraction
- **Pass-through method:** does nothing but pass its args on; adds complexity, no functionality (p. 52). Fix: expose the lower class, redistribute the work, or merge (Fig 7.1).
- **Pass-through variable:** a var passed down a chain of APIs. Fix: a shared object or a **context object** given to constructors (§7.5).
- **Context object (§7.5):** the default home for system-wide state (config, shared handles). Pass one object to constructors instead of using globals or threading many vars through calls.
- **Pass-through is OK in a dispatcher:** it selects which method to call and fills in the args (§7.2).
- **Decorators (wrappers):** take an existing object and add functionality. Often shallow; first try putting the feature in the base class or the use case (§7.3).
- **Interface vs implementation:** different layer, different abstraction. The internal representation should differ from the interface's abstraction (§7.4).

## Ch 9: Better Together or Apart?
**Why subdivision is bad**
- More interfaces means more complexity.
- Separation makes it harder to see related code together. ★ If there are deps, separation is bad.
- It creates duplication.

**Indicators that code is related (bring it together)**
- **Shares information**, like a protocol or syntax. E.g. reading and parsing an HTTP request belong in one place, because the reader has to half-parse the request just to find where it ends (§9.1).
- **Used together:** if you use one, you use the other. This only counts if it holds both ways.
- **Overlap:** a simple higher-level category covers both. E.g. substring search and case conversion are both string manipulation.
- **Hard to understand one without the other.**
- **Simplifies the interface:** two methods that are each part of the solution to one problem (§9.2).
- **Eliminates duplication** (red flag: repetition, p. 68):
```c
switch (common->opcode) {
  case DATA:   if (received->getStart<DataHeader>()   == NULL) goto packetTooShort; ...
  case GRANT:  if (received->getStart<GrantHeader>()  == NULL) goto packetTooShort; ...
  case RESEND: if (received->getStart<ResendHeader>() == NULL) goto packetTooShort; ...
}
packetTooShort:   // one LOG instead of one per case
  LOG(WARNING, "%s packet from %s too short (%u bytes)", ...);
  return;
```

**Splitting and joining methods (§9.7)**
- Usually consolidate. A method that runs 5 blocks of 20 lines is fine; it's easier to see the blocks in one place than to search for them.
- ★ **Each method should provide a clean abstraction and do one thing, completely.** Depth beats length.
- Split only two ways (Fig 9.3):
  - **(b) Extract a subtask:** valid only if the child can be read without the parent, and the parent without the child's internals. If you flip between them, it's conjoined, so undo it.
  - **(c) Split into two caller-visible methods:** valid only if each new interface is simpler and most callers need just one of them.
  - **Never (d):** shallow methods that callers must chain, passing state between them.
- **Depth beats length (§9.8):** don't split for length alone. First make it deep, then short enough to read.

## Ch 8: Pull Complexity Downwards
- ★ **It's more important for a module to have a simple interface than a simple implementation.**
- Take the complexity on yourself rather than handing it to the module's users. Do it only when it (a) is closely related to the module's existing functionality, (b) simplifies code elsewhere, and (c) simplifies the module's interface (§8.3).
- **Configuration parameters:** decide what is actually necessary. Before exporting one, ask: *"Can callers determine a better value than this module can?"* If not, compute it internally. If you do export it, give it a reasonable default (§8.2).

## Ch 10: Define Errors Out of Existence
- Exceptions are one of the biggest sources of special-case code. Reduce the number of places that have to handle them (§10.1).
- **Define errors out:** redefine the semantics so the error can't happen. E.g. `unset(x)` means "ensure x doesn't exist", so a missing x isn't an error (§10.3).
- **Mask:** detect and handle the condition at a low level so higher levels never see it. E.g. TCP resends lost packets (§10.6).
- **Aggregate:** handle many exceptions in one handler, high up, instead of one handler per call site (§10.7).
- **Just crash:** for errors that are rare and practically unhandleable (e.g. out of memory), print diagnostics and abort (§10.8).
- ★ **Don't go too far:** hide an exception only if callers don't need it. If it's important (lost messages, a failed peer), expose it (§10.9).

## Ch 11: Design It Twice
- Your first idea is unlikely to be the best. For each major decision, sketch **2+ radically different** designs, covering only the key methods.
- Compare them by **ease of use for higher-level code** first, then interface simplicity, generality and efficiency.
- The best result is often a combination. If none is good, use their weaknesses to drive a new design.

## Ch 13: Cross-Module Decisions
- **Cross-module decisions (§13.7):** decisions that span modules (a protocol shared by sender and receiver, status codes, mode tables) cause many bugs. Record each one in the project design doc's **history section**: the decision, why, and which modules depend on it. Don't create new files for this.

## Ch 14: Names
**Core idea:** a name is a small abstraction; it should **create an image** of the thing (§14.2).
- **Test:** seen alone, with no declaration, docs or usage, how closely can a reader guess what it is? Aim for 2–3 words that capture what matters most.

**Properties**
1. **Precise (§14.3):** say *what kind* of thing it is. `getCount()` → `numActiveIndexlets`, `x, y` → `charIndex, lineIndex`.
   - **Booleans are predicates:** `blinkStatus` → `cursorVisible`, so true and false read obviously.
2. **Consistent (§14.4):**
   - Always use the common name for its purpose.
   - Never use it for anything else.
   - Keep the purpose narrow enough that every variable with that name behaves the same.
   - For two of the same kind, add a prefix: `srcFileBlock`, `dstFileBlock`.
3. **No extra words (§14.5):** `fileObject` → `file`; no type tags like `filePtr`.

- **Length scales with distance (§14.6):** the farther the uses are from the declaration, the longer the name. `i` is fine in a loop; a field needs a full name.
- **Red flags:**
  - **Vague name** (p. 123): could refer to many things.
  - **Hard to pick name** (p. 125): the thing probably isn't cleanly designed. Fix the design, not the name.

**Conventions (§17.2)**
- **Write down the convention and keep it consistent.** Choose one style per language, write it down, enforce it automatically (linter or pre-commit hook), and never mix styles. In existing code, follow what's already there ("When in Rome").

| Thing | Convention (Python, PEP 8) | Example |
|---|---|---|
| Modules / files | snake_case | `ik_solver.py` |
| Classes | PascalCase | `IkSolver` |
| Functions / methods / variables | snake_case | `solve_joint_angles()` |
| Constants | UPPER_SNAKE | `MAX_ITERATIONS` |
| Private / internal | leading `_` | `_cache` |

- **Units go in the name** when a type can't carry them: `timeout_ms`, `angle_deg`, `speed_mm_s` (precision, §13.3).
- **Booleans are predicates:** `is_homed`, `has_target`, `motor_enabled` (§14.3).
- **Functions are verbs and data are nouns:** `move_blocking()`, `joint_angles`.
- **Acronyms are treated as words:** `UsbParser`, not `USBParser`; `usb_rx` in snake_case.

## Comments (Ch 12–13, 16)
**Core idea:** code can only state the formal interface. Meaning, side effects, limits and *why* exist only in comments (§12.1). A comment must say something the code next to it **doesn't** (§13.2).

**Two levels, never the same level as the code**
- **Lower, for precision (§13.3):** on declarations, give units, inclusive or exclusive bounds, what null or empty means, who frees it, and invariants.
- **Higher, for intuition (§13.4):** intent, reasoning, and a simpler way to think about the code.

**Two kinds, kept separate (§13.5–13.6)**
| | 🟦 **Interface comment** | 🟧 **Implementation comment** |
|---|---|---|
| **For** | Callers: how to *use* it | Maintainers: how it *works* |
| **Where** | Above the module or function | Inside the body, above each major block |
| **Says** | What it does, args, return, side effects, preconditions, errors, limits | *What* each block does and *why*, not *how* |
| **Never** | Implementation details. If they're needed, the module is shallow. | Restating the line below it |

**Pseudocode walkthrough template** (🟦 = interface, 🟧 = implementation)
```
// 🟦 MODULE <Name>
// 🟦 Provides: <the abstraction, in 1–2 sentences, as a caller sees it>
// 🟦 Each instance represents: <what one object is>
// 🟦 Hides: <design decisions this module owns>
// 🟦 Limits: <threading, timing, size, ownership>

    // 🟦 <function_name>(<args>) -> <return>
    // 🟦 Does: <behavior as the caller perceives it>
    // 🟦 Args: <name>: <meaning, units, valid range>
    // 🟦 Returns: <meaning, incl. empty or special values>
    // 🟦 Side effects: <state changed, I/O, what later calls see, etc>
    // 🟦 Requires: <preconditions, call order>
    // 🟦 Errors: <defined out | masked | reported how>
    function_name(args):
        // 🟧 Phase 1: <what this block achieves, and why>
        <pseudocode>
        // 🟧 Phase 2: <what, and why this way and not the obvious way>
        <pseudocode>
```
- **Checks for each function:**
  - If the 🟦 block is long or hard to write, rethink the design (Ch 15).
  - If the 🟦 block describes the 🟧 blocks, the function is shallow.
  - Short functions need no 🟧 at all.

**Keeping comments correct (Ch 16)**
- Document each decision **exactly once**, in its most obvious place (e.g. the declaration of the variable it affects). Cross-module decisions go in the history section (Ch 13).
- Check the diff before committing. Higher-level comments go stale least.

- **Red flags:**
  - **Comment repeats code** (p. 104)
  - **Implementation contaminates interface** (p. 114)
  - **Hard to describe** (p. 133)

## Ch 15: Write the Comments First
- **Order:** class interface comment → method signatures and interface comments with empty bodies → iterate → key member variables → bodies (§15.2).
- **Comments are a design tool:** if the interface comment is short and complete, the interface is simple. If it has to describe the implementation to be complete, the module is shallow (§15.3).
- **Hard to describe** (p. 133): if a simple, complete comment is hard to write, the design is the problem.

## Ch 17: Consistency
- **Follow the existing conventions** of the codebase (naming, structure, patterns), even if you'd choose differently. Don't change a convention unless the new one is significantly better and you update every use (§17.2–17.3).

## Ch 21: Minimize What Matters
- **Minimize what matters (§21.2):** fewer required params, defaults for the common case, exceptions handled low, values computed rather than configured. Use this as the tiebreaker between designs.

## Red flags checklist
- **Shallow module** (p. 25): the interface is about as complex as the implementation.
- **Information leakage:** one decision lives in several modules.
- **Temporal decomposition:** split by execution order, not by knowledge.
- **Overexposure** (p. 36): callers must learn rare features to use common ones.
- **Pass-through method or variable:** forwards without adding anything.
- **Special-general mixture** (p. 71): special-case code sits inside a general mechanism.
- **Repetition:** the same nontrivial code appears in several places.
- **Conjoined methods** (p. 75): one can't be understood without the other.
- **Hard to describe** (p. 133): the interface comment has to be long to be complete.
- **Vague or hard-to-pick name** (pp. 123, 125): the name could mean many things, or no clean name exists.
- **Comment repeats code** (p. 104) or **implementation contaminates interface** (p. 114).
- **Exported config knob** *(my summary of §8.2, not a named red flag)*: the module could have chosen the value itself.
