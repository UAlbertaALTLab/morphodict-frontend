def run(call):
    """Perform post-git-pull deploy operations"""

    call(["docker-compose", "build"])
    call(["docker-compose", "up", "-d", "--remove-orphans"])
