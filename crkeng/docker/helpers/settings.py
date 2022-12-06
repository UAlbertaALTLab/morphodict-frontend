from pathlib import Path

from .app import App

# The directory containing the docker-compose file
DOCKER_COMPOSE_DIR = Path(__file__).parent.parent


# Port assignments and UIDs are tracked at:
# https://github.com/UAlbertaALTLab/deploy.altlab.dev/blob/master/docs/application-registry.tsv

APP_INFO = {
    "crkeng": {"port": 3000, "uwsgi_stats_port": 4000},
    "cwdeng": {"port": 3002, "uwsgi_stats_port": 4002},
    "srseng": {"port": 3001, "uwsgi_stats_port": 4001},
    "arpeng": {"port": 3004, "uwsgi_stats_port": 4004},
    "hdneng": {"port": 3003, "uwsgi_stats_port": 4003},
}

APPS = [App(k, **v) for k, v in APP_INFO.items()]
