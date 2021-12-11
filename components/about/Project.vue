<template>
  <div ref="Project" class="project">
    <div ref="ProjectWrapper" class="project-wrapper">

    </div>
  </div>
</template>

<script>
import projectData from '@/assets/json/project.json'

export default {
  data: () => {
    return {
      projectData: projectData,
    }
  },
}
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  height: 5000px;
}

.project-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--viewportHeight) !important;
  z-index: -1;
}
</style>