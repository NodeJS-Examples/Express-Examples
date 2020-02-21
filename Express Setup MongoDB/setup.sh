sudo cp ./mongodb-org-4.2.repo /etc/yum.repos.d/mongodb-org-4.2.repo
sudo yum clean all
sudo yum update -y glibc
sudo yum install -y mongodb-org