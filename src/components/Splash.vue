<template lang="pug">
.splash-screen(v-if="!animationComplete")
  .logo-container
    .circle
    .checkmark
  h1.app-title {{ texteComplet }}
  h2.app-subtitle {{ texteAffiche }}
TodoScreen(v-else)
</template>

<script>
import TodoScreen from './TodoScreen.vue'

export default {
  components: {
    TodoScreen
  },
  data() {
    return {
      texteComplet: "Ma Todo App",
      texteAffiche: "",
      sousTitreComplet: "Created and powered by Dawud kauné",
      index: 0,
      animationComplete: false
    }
  },
  mounted() {
    this.animerTexte()
  },
  methods: {
    animerTexte() {
      if (this.index < this.sousTitreComplet.length) {
        this.texteAffiche += this.sousTitreComplet.charAt(this.index)
        this.index++
        setTimeout(this.animerTexte, 50)
      } else {
        setTimeout(() => {
          this.animationComplete = true
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;400&display=swap');

.splash-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.logo-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #4a90e2;
  border-radius: 50%;
  animation: circle-animation 1s ease-out;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 20px;
  border: solid #4a90e2;
  border-width: 0 0 4px 4px;
  transform: rotate(-45deg) translate(-6px, -12px);
  animation: checkmark-animation 0.5s ease-in-out 0.5s both;
}

.app-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
  opacity: 0;
  animation: fade-in 1s ease-out 1s forwards;
}

.app-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #666;
  margin-top: 0;
  opacity: 0;
  animation: fade-in 1s ease-out 1.5s forwards;
}

@keyframes circle-animation {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes checkmark-animation {
  0% { width: 0; height: 0; opacity: 0; }
  100% { width: 40px; height: 20px; opacity: 1; }
}

@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.start-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: #3a7bc8;
}
</style>