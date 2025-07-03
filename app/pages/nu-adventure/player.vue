<template>
  <div class="player-container">
    <header class="player-header">
      <h1>Chapter 3: The Forked Path</h1>
    </header>
    <main class="player-main">
      <div class="passage-content">
        <p>
          <NuxtImg
            src="https://cdn.worldofnuclear.com/static/images/lessons/atoms/periodic-table.png"
            class="img-left pr-4 w-[350px] max-w-none"
            width="350"
          />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
          feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
          egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit
          amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo
          vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
          ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar
          facilisis. Ut felis.
        </p>
        <NuxtImg
          src="https://cdn.worldofnuclear.com/static/images/lessons/atoms/radiation-beta.svg"
          alt="Center"
          class="text-center"
        />
        <NuxtImg
          src="https://cdn.worldofnuclear.com/static/images/lessons/atoms/simple-atom.svg"
          alt="Right"
          class="img-right"
        />
        <p>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna
          eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
          facilisis luctus, metus.
        </p>
        <p>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a,
          ultricies in, diam. Sed arcu. Cras consequat.
        </p>
      </div>
      <div class="choices-stack">
        <UButton block>Take the left path into the woods</UButton>
        <UButton block>Follow the river downstream</UButton>
        <UButton block>Climb the rocky hill</UButton>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// No logic yet; just scaffolding
</script>

<style scoped>
.player-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.player-header {
  flex: 0 0 auto;
  background: #222;
  color: #fff;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.player-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
}

.player-main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
}

.passage-content {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 2rem;
  font-size: 1.15rem;
  line-height: 1.7;
  border-bottom: 1px solid #eee;
}

.passage-content img {
  margin: 1rem 0;
  border-radius: 8px;
  max-width: 180px;
  max-height: 120px;
}

.img-left {
  float: left;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
}

.img-right {
  float: right;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.img-center {
  display: block;
  margin: 1.5rem auto;
  float: none;
}

.choices-stack {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);
}

.choice-btn {
  font-size: 1.1rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

.choice-btn:hover {
  background: #2563eb;
}
</style>
