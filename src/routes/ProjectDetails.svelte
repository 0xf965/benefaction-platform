<script lang="ts">
    import { type Project, is_ended, min_raised } from "$lib/project";
    import { sha256 } from "$lib/sha256";
    import { address, connected, project_detail } from "$lib/store";
    import { Button, Progress } from "spaper";


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

    let deadline_passed = false;
    let is_min_raised = false;
    async function load()
    {
        deadline_passed = await is_ended(project);
        is_min_raised = await min_raised(project)
    }
    load()

    let is_owner = false;
    async function checkIfIsOwner() {
        is_owner = $connected && await sha256($address ?? "") === project.owner;
    }
    checkIfIsOwner();
</script>

<div class="back">
    <Button class="btn-primary" on:click={closePage}>&lt; Go to main</Button>
</div>

<!-- Main Project Detail Page -->
<div class="project-detail">

    <div class="details">
        <p><strong>Block Limit:</strong> {project.block_limit}</p>
        <p><strong>Minimum Amount:</strong> {project.minimum_amount}</p>
        <p><strong>Total Amount:</strong> {project.total_amount}</p>
        <p><strong>Exchange Rate:</strong> {project.exchange_rate}</p>
        <p><strong>ERGs collected:</strong> {project.value}</p>
        <p><strong>Tokens sold:</strong> {project.amount_sold}</p>
        <p><strong>Deadline passed:</strong> {deadline_passed ? "Yes": "No"}</p>
        <p><strong>Min value raised:</strong> {is_min_raised ? "Yes": "No"}</p>

        <!-- Action Buttons -->
        <div class="actions">
            <!-- Project owner actions -->
            {#if is_owner}
                <Button style="background-color: orange; color: black; border: none;" on:click={increaseDonation}>Add tokens</Button>
                <Button style="background-color: orange; color: black; border: none;" on:click={withdrawDonation}>Withdraw ERGs</Button>
            {:else}
                <p><strong>Owner (sha256):</strong> {project.owner}</p>
            {/if}


            <!-- User actions -->
            {#if $connected}
                <Button style="background-color: orange; color: black; border: none;" on:click={increaseDonation}>Buy</Button>
                <Button style="background-color: orange; color: black; border: none;" on:click={increaseDonation}>Increase Donation</Button>
                <Button style="background-color: orange; color: black; border: none;" on:click={withdrawDonation}>Refund</Button>
            {/if}

            <!-- General actions -->
            <Button style="background-color: orange; color: black; border: none;" on:click={shareProject}>Share</Button>
            
        </div>
    </div>

    <div class="progress">
        <Progress value="20" type="primary" />
    </div>
</div>

<style>
    .back {
        margin-top: 2rem;
        margin-left: 3.5rem;
        margin-bottom: 0rem;
    }

    .project-detail {
        margin-left: 2rem;
        padding: 1.5rem;
        border-radius: 8px;
        color: #ddd;
        display: flex;
        flex-direction: row;
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
