function solution(k, dungeons) {
    let result = 0;

    function dfs(remain, count, visited) {
        result = Math.max(result, count);

        for (let i = 0; i < dungeons.length; i++) {
            if (!visited[i] && remain >= dungeons[i][0]) {
                visited[i] = true;
                dfs(remain - dungeons[i][1], count + 1, visited);
                visited[i] = false;
            }
        }
    }

    dfs(k, 0, Array(dungeons.length).fill(false));

    return result;
}