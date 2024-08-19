# Makefile to manage Kubernetes deployments, services, and resources

# Apply configurations
start: appdep appcm
	@echo "Starting application with deployment, service, and configmap..."

# Get statuses
get: getdep getsvc getpod
	@echo "Getting status of deployments, services, and pods..."

# Delete configurations
stop: delsvc deldep delpod
	@echo "Deleting services, deployments, and pods..."

# Get node statuses
getnode:
	kubectl get nodes

# Apply deployment configuration
appdep:
	kubectl apply -f backend-deployment.yaml
	kubectl apply -f external-deployment.yaml
	kubectl apply -f react-deployment.yaml
	kubectl apply -f mongo-pv.yaml
	kubectl apply -f mongo-pvc.yaml
	kubectl apply -f role.yaml
	kubectl apply -f rolebinding.yaml
	kubectl apply -f summary-deployment.yaml
	

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
	kubectl delete svc react-service
	kubectl delete svc summary-service

# Delete deployments
deldep:
	kubectl delete deployment backend-deployment
	kubectl delete deployment external-deployment
	kubectl delete deployment react-deployment
	kubectl delete deployment summary-deployment

# Delete pods
delpod:
	kubectl delete pods -l app=backend --grace-period=0 --force
	kubectl delete pods -l app=external --grace-period=0 --force
	kubectl delete pods -l app=react --grace-period=0 --force
	kubectl delete pods -l app=summary --grace-period=0 --force

execnode:
	$(eval POD_NAME=$(shell kubectl get pods -l app=backend -o jsonpath="{.items[0].metadata.name}"))
	kubectl exec -it $(POD_NAME) -c node-express -- /bin/sh

lognode:
	$(eval POD_NAME=$(shell kubectl get pods -l app=backend -o jsonpath="{.items[0].metadata.name}"))
	kubectl logs $(POD_NAME) -c node-express

logmongo:
	$(eval POD_NAME=$(shell kubectl get pods -l app=backend -o jsonpath="{.items[0].metadata.name}"))
	kubectl logs $(POD_NAME) -c mongo

execmongo:
	$(eval POD_NAME=$(shell kubectl get pods -l app=backend -o jsonpath="{.items[0].metadata.name}"))
	kubectl exec -it $(POD_NAME) -c mongo -- /bin/sh

logjwt:
	$(eval POD_NAME=$(shell kubectl get pods -l app=backend -o jsonpath="{.items[0].metadata.name}"))
	kubectl logs $(POD_NAME) -c jwt-auth-proxy

logexternal:
	$(eval POD_NAME=$(shell kubectl get pods -l app=external -o jsonpath="{.items[0].metadata.name}"))
	kubectl logs $(POD_NAME) -c external

execexternal:
	$(eval POD_NAME=$(shell kubectl get pods -l app=external -o jsonpath="{.items[0].metadata.name}"))
	kubectl exec -it $(POD_NAME) -c external -- /bin/sh

execjwt:
	$(eval POD_NAME=$(shell kubectl get pods -l app=backend -o jsonpath="{.items[0].metadata.name}"))
	kubectl exec -it $(POD_NAME) -c jwt-auth-proxy -- /bin/sh
