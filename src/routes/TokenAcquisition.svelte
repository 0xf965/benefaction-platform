<script>
    import ProjectList from "./project_list.svelte";
   // import is_ended from "$lib/project";

   // const projectFilter = (project) => ! await is_ended(project);
</script>
<ProjectList filterProject={null}>
    Available projects
</ProjectList>