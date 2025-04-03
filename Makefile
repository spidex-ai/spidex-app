ifndef u
u:=root
endif

deploy:
	rsync -avhzL --delete \
				--no-perms --no-owner --no-group \
				--exclude .idea \
				--exclude .git \
				--exclude .next \
				--exclude node_modules \
				--exclude .husky \
				--exclude .env \
				--exclude .env.local \
				--exclude .env.docker \
				--exclude .env.rinkerby \
				--exclude .env.ropsten \
				--exclude .env.staging \
				--exclude dist \
				. $(u)@$(h):$(dir)
	ssh $(u)@$(h) "cd $(dir); docker compose up -d --build"
deploy-dev: 
	make deploy h=160.191.175.10 dir=/root/spidex-app