<script setup>
import { ref } from "vue";

const activeTab = ref("luck");

// Tab 1: Keberuntungan
const luckyNumber = ref(null);
const checkLuck = () => {
  luckyNumber.value = Math.floor(Math.random() * 100) + 1;
};

// Tab 2: Pilih Karakter
const characters = ["🐱 Kucing", "🐶 Anjing", "🐰 Kelinci", "🐻 Beruang"];
const selectedCharacter = ref("");

// Tab 3: Game Tebak Angka
const randomNumber = ref(Math.floor(Math.random() * 10) + 1);
const userGuess = ref(null);
const message = ref("");

const checkGuess = () => {
  if (parseInt(userGuess.value) === randomNumber.value) {
    message.value = "🎉 Selamat! Kamu benar!";
  } else {
    message.value = "❌ Coba lagi!";
  }
};
</script>

<template>
  <div class="container">
    <div class="tabs">
      <div class="tab-buttons">
        <button :class="{ active: activeTab === 'luck' }" @click="activeTab = 'luck'">Keberuntungan</button>
        <button :class="{ active: activeTab === 'character' }" @click="activeTab = 'character'">Pilih Karakter</button>
        <button :class="{ active: activeTab === 'guess' }" @click="activeTab = 'guess'">Tebak Angka</button>
      </div>

      <div class="tab-content">
        <!-- Tab 1: Keberuntungan -->
        <div v-if="activeTab === 'luck'">
          <h3>Apakah Kamu Beruntung Hari Ini? 🎲</h3>
          <button @click="checkLuck">Cek Keberuntungan</button>
          <p v-if="luckyNumber !== null">Angka keberuntunganmu: <b>{{ luckyNumber }}</b></p>
        </div>

        <!-- Tab 2: Pilih Karakter -->
        <div v-if="activeTab === 'character'">
          <h3>Pilih Karakter Favoritmu 🐾</h3>
          <select v-model="selectedCharacter">
            <option disabled value="">Pilih karakter...</option>
            <option v-for="char in characters" :key="char">{{ char }}</option>
          </select>
          <p v-if="selectedCharacter">Kamu memilih: <b>{{ selectedCharacter }}</b></p>
        </div>

        <!-- Tab 3: Tebak Angka -->
        <div v-if="activeTab === 'guess'">
          <h3>Tebak Angka (1-10) 🎯</h3>
          <input type="number" v-model="userGuess" placeholder="Masukkan angka..." />
          <button @click="checkGuess">Cek Jawaban</button>
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin-bottom: 50px;
}

.tabs {
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 320px;
  background: var(--vp-c-background-soft);
}

.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.tab-buttons button {
  padding: 8px 12px;
  border: none;
  background: var(--vp-c-gray-1);
  cursor: pointer;
  border-radius: 5px;
}

.tab-buttons .active {
  background: var(--vp-c-tip-3);
  color: white;
}

.tab-content input, .tab-content select {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
}

.tab-content button {
  padding: 5px 10px;
  margin: 5px;
  border: none;
  background: var(--vp-c-success-2);
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
</style>
