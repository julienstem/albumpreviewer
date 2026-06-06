# =========================================
# Stage 1: Build the React.js Application
# =========================================

FROM dhi.io/node:24-alpine3.22-dev AS builder

WORKDIR /app

# On ne copie QUE le package.json (pas de lockfile foireux pour l'instant)
COPY package.json ./

# On installe proprement les dépendances directement dans Docker
RUN npm install

# On copie le reste du code source de ton Windows
COPY . .

# On lance le build de React
RUN npm run build

# =========================================
# Stage 2: Prepare Nginx (Le reste ne change pas)
# =========================================
FROM dhi.io/nginx:1.28.0-alpine3.21-dev AS runner

COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

USER nginx
EXPOSE 8080

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]