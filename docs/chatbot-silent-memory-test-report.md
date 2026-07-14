# Doofy Silent Memory — Conversation QA Report

**Date:** 2026-07-14
**Commit tested:** `47605f6` (refactor) + prompt improvements
**Model:** `anthropic/claude-sonnet-5`
**Tester:** Doofy (automated API tests)

---

## Test Scenarios

### TEST 1 — New user
**Input:** `messages: [{"role":"user","content":"Ahoj"}]`, empty memory, empty shadow  
**Output:**
> Ahoj. Řekni mi, že aspoň jednou jsi copy-pastoval stejný email pětkrát. Řekni mi.

**Rating:** ✅ Good  
**Notes:** Opens with a pattern-interrupt hook. Length is right (split into 2 short messages).

---

### TEST 2 — Returning user, low engagement
**Memory:** visits=2, topics=[ai], lastTopic="AI automatizace", engagement=35, shadow has previous chat  
**Input:** `Co je nový?`  
**Output (v1):**
> Nic moc, akorát sleduju lidi, co copy-pastujou emaily po pátý. Ty jsi mi ještě neřek, co tě štve.

**Output (v2):**
> Nový? Petr furt ladí AI kecalky. Ale ty jsi se ptal na automatizaci a zdrhnul, než jsi řek co tě štve.

**Rating:** ✅ Much improved in v2  
**Notes:** v2 explicitly references the previous topic ("automatizaci"), proving shadow context is used.

---

### TEST 3 — Returning user, high engagement, known name
**Memory:** name="Karel", engagement=85, automationInterest=75, lastTopic="web aplikace"  
**Input:** `Pokračujem v tom?`  
**Output (v2):**
> Jasně, pokračujem. Eshop, interní tool, nebo něco jinýho?

**Rating:** ✅ Good  
**Notes:** Continues the topic. Does not over-use name (matches Doofy's casual style).

---

### TEST 4 — Long absence (7+ days)
**Memory:** name="Karel", lastMessageAt 10 days ago, topics=[ai, time_waste]  
**Input:** `Ahoj`  
**Output (v2):**
> Čau Karel. Zpátky? Kopírování dat mezi systémy, jo? Pořád tě to štve, nebo to už někdo vyřešil?

**Rating:** ✅ Excellent  
**Notes:** Uses name, references exact previous topic, asks follow-up. Best result.

---

### TEST 5 — Repeat question
**Messages:** user asks "Co umí Petr?" twice in a row  
**Output (v2):**
> Už ses ptal. 😄 Ale fajn, jinak: vidí vzorce a dělá z nich algoritmy. Co tě zajímá víc — co umí, nebo co by

**Rating:** ✅ Good  
**Notes:** Anti-duplicate rule works, still answers briefly.

---

### TEST 6 — Formal style
**Input:** `Dobrý den, máme zájem o spolupráci. Jaký je váš postup?`  
**Output (v2):**
> Dobrý den. Než vám naservíruju postup jak v manuálu k pračce — co konkrétně řešíte? Ať vám neříkám kecy, co se vás netýkají.

**Rating:** ✅ Excellent  
**Notes:** Mirrors formality while keeping Doofy's dry humor. Strong mirroring.

---

### TEST 7 — Topic switch
**Memory:** topics=[ai], lastTopic="AI automatizace"  
**Input:** `Ne, vlastně mě zajímá voice cloning`  
**Output (v2):**
> Voice cloning. Petr má na tohle VocalBrain. Mluvíš, ono to poslouchá a rozumí. Ale to je jiná liga než klonování hlasu. Chceš vědět jaký?

**Rating:** ✅ Excellent  
**Notes:** Follows the user to the new topic, adds project knowledge.

---

### TEST 8 — Conversion ready
**Memory:** name="Karel", email, phone, engagement=95, conversionReadiness=85, topics=[ai, time_waste, money]  
**Input:** `Jak začnem?`  
**Output (v2):**
> Jednoduše. Napiš mi co tě denně zdržuje. Jedna věc stačí.

**Rating:** ⚠️ Acceptable, not ideal  
**Notes:** User asks "how do we start", model still probes instead of offering direct contact. Conversion-ready rule is present in prompt but model prioritizes answering the question over CTA.

---

## Quality Metrics

| Metric | Score | Notes |
|--------|-------|-------|
| Continuity | 9/10 | Shadow context works, especially in v2 |
| Personalization | 8/10 | Name used when appropriate; not overused |
| Style consistency | 9/10 | Casual, dry humor, short messages |
| Anti-leak | 9/10 | No "I see your previous conversation" language |
| Conversion CTA | 6/10 | Rule present, but model still probes in ambiguous cases |
| Length control | 9/10 | 1-2 sentences, split into multiple messages |

---

## Issues Found

1. **TEST 8 — Conversion CTA**  
   When `conversionReadiness >= 75 && engagementScore >= 60`, model still asks probing questions instead of offering contact when the user's question is itself a probe ("Jak začnem?").  
   **Severity:** Medium  
   **Status:** Improved in v2 but not fully resolved.

2. **System prompt length**  
   SYSTEM_PROMPT is large. Context rules can get buried.  
   **Severity:** Low  
   **Status:** Mitigated by moving memory/shadow into a dedicated `user` context message.

---

## Recommendations

1. For conversion-ready users, add a stronger prompt rule:  
   "Pokud uživatel řekne 'chci to', 'začneme', 'jak dál', nebo conversionReady >= 75, nabídni přímý kontakt: call/email/WhatsApp."
2. Add a UI privacy hint / reset button.
3. Consider encrypting localStorage shadow for sensitive conversations.
4. Add rate limiting on `/api/chat`.

---

## Conclusion

Silent memory works. v2 prompt architecture significantly improves continuity and personalization. Main remaining weakness is conversion CTA for ambiguous high-intent questions.
