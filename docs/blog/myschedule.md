---
layout: home
title: "Schedule"
---

<script setup>
import liteSch from '../.vitepress/theme/components/Schedulelite.vue';  
import ScheduleTable from '../.vitepress/theme/components/ScheduleTable.vue';
import cards from '../.vitepress/theme/components/cards.vue';
import bucards from '../.vitepress/theme/components/bucards.vue';
import Cards3 from '../.vitepress/theme/components/Cards3.vue';
</script>

  <div class= "sch-01">
    <h2>My Schedule</h2>
    <p> Manual simple table </p>
    <liteSch />
  </div>

  <div class= "sch-01">
    <h2>Pagination Table</h2>
    <p> Easy table vue plugin </p>
    <ScheduleTable />
  </div>

<div class="sch-02">
  <h2>Cards 3</h2>
  <Cards3 />
</div>

<div class="sch-02">
  <h2>Cards</h2>
  <bucards />
</div>

<div class="sch-02">
  <h2>Cards 2</h2>
  <cards />
</div>

<style scoped>

  .sch-01 h2, .sch-02 h2 {
    font-family: 'Manrope', sans-serif;
    margin: 10px 0 10px;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1.3;
    color: transparent;
    background: var(--hero-text-gradient-light);
    -webkit-background-clip: text;
    background-clip: text;
    text-align: left;
  }

  html.dark .sch-01 h2, .sch-02 h2 {
    background: var(--hero-text-gradient-dark);
    -webkit-background-clip: text;
    background-clip: text;
  }

  .sch-02 h2 {
    text-align: center;
  }

@media (max-width: 768px) {
  .sch-01 h2, .sch-02 h2 { font-size: 1.9rem; }
}

</style>