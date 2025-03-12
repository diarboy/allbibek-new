---
layout: home
---

<script setup>
import liteSch from '../.vitepress/theme/components/Schedulelite.vue';  
import ScheduleTable from '../.vitepress/theme/components/ScheduleTable.vue';
import cards from '../.vitepress/theme/components/cards.vue';
import bucards from '../.vitepress/theme/components/bucards.vue';
</script>

  <div>
    <h1>My Schedule</h1>
    <liteSch />
  </div>

  <div>
    <h1>Pagination Table</h1>
    <ScheduleTable />
  </div>
    
<div>
  <h2>Cards</h2>
  <cards />
</div>

<div>
  <h2>Cards 2</h2>
  <bucards />
</div>

<style scoped>
h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>