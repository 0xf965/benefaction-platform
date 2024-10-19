<script lang="ts">
    import { explorer_uri, ergo_tree_hash } from '$lib/envs';
    import { fetch_projects } from '$lib/fetch'; // Asumiendo que fetch_projects está en $lib
    import { hexToUtf8 } from '$lib/utils';
    import { onMount } from 'svelte';

    // States for managing the fetched projects
    let projects: Map<string, any> | null = null;
    let errorMessage: string | null = null;
    let isLoading: boolean = true;

    // Parameters required for fetch_projects
    let explorerUri: string = explorer_uri; // Cambia esto por el URI correcto
    let ergoTreeTemplateHash: string = ergo_tree_hash; // Cambia por el hash correcto

    // Function to fetch the projects
    async function loadProjects() {
        try {
            // Fetch the projects using the fetch_projects function
            projects = await fetch_projects(explorerUri, ergoTreeTemplateHash, await ergo);
        } catch (error) {
            // Handle errors (if fetching fails)
            errorMessage = error.message || "Error occurred while fetching projects";
        } finally {
            // Set "isLoading" back to false
            isLoading = false;
        }
    }

    // Fetch the projects when the component is mounted
    onMount(() => {
        loadProjects();
    });
</script>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    .project-list {
        margin-top: 1.5rem;
    }
    .project {
        padding: 1rem;
        border: 1px solid #ccc;
        margin-bottom: 1rem;
        background-color: #f9f9f9;
    }
    .error {
        color: red;
    }
</style>

<div class="container">
    <h1>Project List</h1>

    {#if isLoading}
        <p>Loading projects...</p>
    {/if}

    {#if errorMessage}
        <div class="error">
            <p>{errorMessage}</p>
        </div>
    {/if}

    {#if projects && !isLoading}
        <div class="project-list">
            {#each Array.from(projects) as [projectId, projectData]}
                <div class="project">
                    <h2>Project ID: {projectId}</h2>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a>r4: {hexToUtf8(projectData.additionalRegisters.R4.renderedValue)}</a>
                    <a>r5: {hexToUtf8(projectData.additionalRegisters.R5.renderedValue)}</a>
                    <a>r6: {hexToUtf8(projectData.additionalRegisters.R6.renderedValue)}</a>
                    <a>r7: {hexToUtf8(projectData.additionalRegisters.R7.renderedValue)}</a>
                    <a>r8: {hexToUtf8(projectData.additionalRegisters.R8.renderedValue)}</a>
                    <a>r9: {hexToUtf8(projectData.additionalRegisters.R9.renderedValue)}</a>
                </div>
            {/each}
        </div>
    {/if}
</div>
