<script lang="ts">
    import { explorer_uri, ergo_tree_hash } from '$lib/envs';
    import { fetch_projects } from '$lib/fetch'; // Asumiendo que fetch_projects está en $lib
    import { onMount } from 'svelte';
    import ProjectCard from './ProjectCard.svelte';

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
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
    }

    .card {
        width: 300px;
        margin: 0.5rem;
    }
    .error {
        color: red;
    }
</style>

<div class="container">
    <h1><slot></slot></h1>

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
                <div class="card">
                    <!-- Renderiza una tarjeta ProjectCard para cada projectData -->
                    <ProjectCard project={projectData} />
                </div>
            {/each}
        </div>
    {:else if isLoading}
        <p>Loading projects...</p>
    {:else}
        <p>No projects found.</p>
    {/if}
</div>
