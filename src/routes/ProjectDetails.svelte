<script lang="ts">
    import { project_detail } from "$lib/store";

    interface Project {
        token_id: string;
        block_limit: number;
        minimum_amount: number;
        total_amount: number;
        exchange_rate: number; 
        link: string;
    }

    // Define 'project' as a prop of type Project
    let project: Project = $project_detail;

    // Function to handle increasing donation
    function increaseDonation() {
        // Logic to increase donation
        console.log("Increasing donation");
    }

    // Function to handle withdrawing donation
    function withdrawDonation() {
        // Logic to withdraw donation
        console.log("Withdrawing donation");
    }

    // Function to handle sharing the project
    function shareProject() {
        // Logic to share the project link
        console.log("Sharing project link: " + project.link);
        // You can implement a sharing functionality here (e.g., using navigator.share)
    }

    // Function to close the detail page
    function closePage() {
        project_detail.set(null);
    }
</script>

<!-- Main Project Detail Page -->
<div class="project-detail">
    <p><strong>Block Limit:</strong> {project.block_limit}</p>
    <p><strong>Minimum Amount:</strong> {project.minimum_amount}</p>
    <p><strong>Total Amount:</strong> {project.total_amount}</p>
    <p><strong>Exchange Rate:</strong> {project.exchange_rate}</p>

    <!-- Action Buttons -->
    <div class="actions">
        <button class="btn-primary" on:click={closePage}>X</button>
        <button class="btn-primary" on:click={increaseDonation}>Increase Donation</button>
        <button class="btn-primary" on:click={withdrawDonation}>Withdraw Donation</button>
        <button class="btn-primary" on:click={shareProject}>Share</button>
    </div>
</div>

<style>

    .project-detail {
        margin: 2rem;
        padding: 1.5rem;
        border-radius: 8px;
    }

    .btn-close {
        background-color: transparent; /* Transparent background for close button */
        color: white; /* White text for visibility */
        border: none; /* No border */
        font-size: 1.5rem; /* Larger text size */
        cursor: pointer; /* Pointer cursor on hover */
        position: absolute; /* Position it in the top left */
        top: 1rem;
        left: 1rem;
    }

    .actions {
        margin-top: 1rem;
    }

    .btn-primary {
        background-color: yellow; /* Change button background to yellow */
        color: black; /* Change button text color to black */
        border: none; /* Remove border */
        padding: 0.5rem 1rem;
        border-radius: 4px;
        margin-right: 1rem;
        cursor: pointer; /* Pointer cursor for buttons */
    }

    .btn-primary:hover {
        background-color: #ffeb3b; /* Lighter yellow on hover */
    }
</style>
