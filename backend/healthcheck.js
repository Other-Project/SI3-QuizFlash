(async () => {
    try {
        const res = await fetch("http://localhost:9428/api/status");
        if(res.ok) process.exit(0);
        console.error("Error: ", res.errored);
        process.exit(1);
    } catch (err) {
        console.error("Error: ", err);
        process.exit(1);
    }
})();
