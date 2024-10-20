<script>
    import ProjectList from "./project_list.svelte";

    const filter = (project) => project.token_id; // Need to check if token_id is in ergo wallet tokens.
</script>
<ProjectList filterProject={filter}>
    My donations
</ProjectList>