<script lang="ts">
    import { type Project, is_ended, min_raised } from "$lib/project";
    import { sha256 } from "$lib/sha256";
    import { buy_project } from "$lib/buy";
    import { address, connected, project_detail } from "$lib/store";
    import { Button, Progress, NumberInput } from "spaper";


    // Define 'project' as a prop of type Project
    let project: Project = $project_detail;

    // States for amounts
    let show_submit = true;
    let label_submit = "";
    let function_submit = null;
    let value_submit = 0;

    // Project owner actions
    function add_tokens() {
            // Logic for adding tokens by the project owner
            console.log("Adding tokens:", value_submit);
            // Add logic to call the appropriate function for adding tokens to the project
        }

        function withdraw_tokens() {
            // Logic for withdrawing tokens by the project owner
            console.log("Withdrawing tokens:", value_submit);
            // Add logic to call the appropriate function for withdrawing tokens
        }

        function withdraw_erg() {
            // Logic for withdrawing ERGs by the project owner
            console.log("Withdrawing ERGs:", value_submit);
            // Add logic to call the appropriate function for withdrawing ERGs
        }

        // User actions
        function buy() {
            // Call buy_project function with the specified amount
            console.log("Buying tokens:", value_submit);
            buy_project(project, value_submit);
        }

        function refund() {
            // Logic for refunding tokens to get ERG back
            console.log("Refunding tokens:", show_submit);
            // Add logic to call the appropriate function for refunding tokens
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
                <Button style="background-color: orange; color: black; border: none;" on:click={add_tokens}>Add tokens</Button>
                <Button style="background-color: orange; color: black; border: none;" on:click={withdraw_tokens}>Withdraw tokens</Button>
                {#if deadline_passed && is_min_raised}
                    <Button style="background-color: orange; color: black; border: none;" on:click={withdraw_erg}>Withdraw ERGs</Button>
                {/if}
            {:else}
                <p><strong>Owner (sha256):</strong> {project.owner}</p>
            {/if}


            <!-- User actions -->
            {#if $connected}
                {#if project.total_amount !== project.amount_sold}
                    <Button style="background-color: orange; color: black; border: none;" on:click={buy}>Buy</Button>
                {/if}
                {#if deadline_passed && ! is_min_raised}
                    <Button style="background-color: orange; color: black; border: none;" on:click={refund}>Refund</Button>
                {/if}
            {/if}

            <!-- General actions -->
            <Button style="background-color: orange; color: black; border: none;" on:click={shareProject}>Share</Button>
            
        </div>

        {#if show_submit}
            <div>
                <NumberInput
                    bind:value={value_submit}
                    label={label_submit}
                    min="0"
                />
                <Button style="background-color: orange; color: black; border: none;" on:click={function_submit}>Submit</Button>
            </div>
        {/if}
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
