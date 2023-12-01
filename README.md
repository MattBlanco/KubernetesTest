# Kubernetes Test

Learning to use kubernetes with my own website.

Vue frontend and Express backend with Mongodb.

Commands I used

minikube delete --all

kubectl apply -f mongo-config.yaml
kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo.yaml
kubectl apply -f backend.yaml

minikube service backend-service --url - see actual url for service named backend-service