<script lang="ts">
    import type { Project } from "$lib/project";


    import {project_detail} from "$lib/store";

    // Define 'project' as a prop of type Project
    export let project: Project;

    function toggleDetails() {
        // Get the current value of the store
        project_detail.set(project);
    }
</script>

<div class="card">
    <div class="card-body">
        <h3 class="card-title">Project ID: {project.token_id}</h3>
        <p><strong>Block Limit:</strong> {project.block_limit}</p>
        <p><strong>Minimum Amount:</strong> {project.minimum_amount}</p>
        <p><strong>Total Amount:</strong> {project.total_amount}</p>
        <p><strong>Exchange Rate:</strong> {project.exchange_rate}</p>
        <button class="btn-close" on:click={toggleDetails}>View</button>
        
    </div>
</div>

<style>
    /* Custom styles for the card */
    .card {
        margin: 1rem 0;
        border: 1px solid #ddd;
    }

    .card-body {
        padding: 1rem;
    }

    .card-title {
        margin-bottom: 0.5rem;
    }

    .btn-primary {
        background-color: #2196f3;
        border-color: #2196f3;
        color: #fff;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
    }

    .btn-primary:hover {
        background-color: #1976d2;
        border-color: #1976d2;
    }
</style>
