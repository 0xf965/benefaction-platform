<script lang="ts">

    interface Project {  // TODO Should be imported.
        token_id: string,
        block_limit: number,
        minimum_amount: number,
        total_amount: number,
        exchange_rate: number, 
        link: string
    }

    // Define 'project' as a prop of type Project
    export let project: Project;
</script>

<div class="card">
    <div class="card-body">
        <h3 class="card-title">Project ID: {project.token_id}</h3>
        <p><strong>Block Limit:</strong> {project.block_limit}</p>
        <p><strong>Minimum Amount:</strong> {project.minimum_amount}</p>
        <p><strong>Total Amount:</strong> {project.total_amount}</p>
        <p><strong>Exchange Rate:</strong> {project.exchange_rate}</p>
        <a class="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
        </a>
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
