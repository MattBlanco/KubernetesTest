# Kubernetes Test

Learning to use kubernetes with my own website.

Vue frontend and Express backend with Mongodb.

## Commands I used to run k8s

minikube start
minikube delete --all

kubectl apply -f mongo-config.yaml ;
kubectl apply -f mongo-secret.yaml ;
kubectl apply -f mongo.yaml ;
kubectl apply -f backend.yaml ; 
kubectl apply -f frontend.yaml ;

minikube service frontend-service --url - create tunnel for frontend service

## Building & pushing new versions of frontend and backend for docker hub

docker build -t backend . -f Dockerfile.backend  
docker image tag backend blanco326/backend:latest
docker image push blanco326/backend:latest

docker build -t frontend . -f Dockerfile.frontend  
docker image tag frontend blanco326/frontend:latest
docker image push blanco326/frontend:latest

## Port forward to account for minikube
kubectl port-forward svc/backend-service 3000:3000