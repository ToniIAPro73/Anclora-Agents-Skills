# Convergence & Iteration Policy

## Stopping Criteria
The agent should stop iterating and present the final result when ANY of these conditions are met:

1. **Goal Achieved**: All primary metrics in the `metrics-rubric.md` exceed their minimum thresholds.
2. **Plateau Detected**: The quality score delta (Δ) between the last two iterations is < 5%.
3. **Max Iterations**: Reaching 5 consecutive iterations (can be adjusted by the user).
4. **Resource Budget**: Running low on daily NotebookLM query credits.
5. **Timeout/User Override**: User manually stops the process.

## Backtracking Strategy
1. **Checkpointing**: Before any deletion or major instruction change, save the state.
2. **Comparison**: After each change, run a "Standard Validation Query".
3. **Rollback**: If the new response is worse than the baseline, immediately revert the last change.
