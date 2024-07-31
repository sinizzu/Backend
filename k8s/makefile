# Makefile to manage Kubernetes deployments, services, and resources

# Apply configurations
start: appdep appcm
	@echo "Starting application with deployment, service, and configmap..."

# Get statuses
get: getdep getsvc getpod
	@echo "Getting status of deployments, services, and pods..."

# Get node statuses
getnode:
	kubectl get nodes

# Apply deployment configuration
appdep:
	kubectl apply -f backend-deployment.yaml
	kubectl apply -f external-deployment.yaml
	kubectl apply -f summary-deployment.yaml
	kubectl apply -f react-deployment.yaml
	kubectl apply -f mongo-pv.yaml
	kubectl apply -f mongo-pvc.yaml
	

# Apply configmap configuration
appcm:
	kubectl apply -f configmap.yaml

# Get deployment statuses
getdep:
	kubectl get deployments -o wide

# Get service statuses
getsvc:
	kubectl get svc -o wide

# Get pod statuses
getpod:
	kubectl get pods -o wide

# Delete services
delsvc:
	kubectl delete svc backend-service
	kubectl delete svc external-service
	kubectl delete svc summary-service
	kubectl delete svc react-service

# Delete deployments
deldep:
	kubectl delete deployment backend-deployment
	kubectl delete deployment external-deployment
	kubectl delete deployment summary-deployment
	kubectl delete deployment react-deployment

# Delete pods
delpod:
	kubectl delete pods -l app=backend --grace-period=0 --force
	kubectl delete pods -l app=external --grace-period=0 --force
	kubectl delete pods -l app=summary --grace-period=0 --force
	kubectl delete pods -l app=react --grace-period=0 --force
