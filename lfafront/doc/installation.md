# Installation

## Create and provision the vagrant

- Launch VM:
  - `vagrant up`
  - If you encounter error `ttyname failed: Inappropriate ioctl for devices`:
    - Update vagrant to the latest version from the website

- Add your ssh key in the vagrant:
  - `vagrant ssh`
  - `vim .ssh/authorized_keys` and copy-paste your public key.

- Launch the provisionning
  - Install [Ansible](http://docs.ansible.com/ansible/latest/intro_installation.html#installation) on your machine if you do not have it already
  - `ansible-playbook devops/provisioning/playbook.yml -i devops/provisioning/hosts/vagrant`
  - If the command fails, run:
    - `ssh-keygen -R 10.0.0.10 && ssh vagrant@10.0.0.10`
    - exit the vagrant
  - If it still fails, run `sudo pip install mozdownload`

## Install the server

- **Connect to the vagrant as www-data**:
    ```bash
    vagrant ssh
    sudo su - www-data
    ```
- Update your .env
    ```bash
    TRUSTED_PROXIES=10.0.0.0/8
    TRUSTED_HOSTS=lfafront.local, localhost, api
    ```
- Go to your app folder: `cd /var/www/lfafront/current`
- Create your Symfony application `composer create-project symfony/skeleton api`
- Add API Platform if you need it `cd api && composer req api`
- Install and configure the php code sniffer with SymfonyCustom coding standard `composer require --dev vincentlanglet/symfony3-custom-coding-standard && vendor/bin/phpcs --config-set installed_paths ../../vincentlanglet/symfony3-custom-coding-standard`
- Create the database `bin/console doctrine:database:create`
- Create the database schema `bin/console doctrine:schema:create`
- Browse your API: `http://10.0.0.10/app_dev.php/api`
- That's it! You can now [create your first entity](https://api-platform.com/docs/distribution#bringing-your-own-model).

## Build your frontend code

- If you have a static frontend such as React:

  - Connect to the vagrant: `vagrant ssh`

  - Build the frontend code: `cd /var/www/lfafront/current/client && source .env && yarn build`

  - Symlink the frontend code in the web directory: `cd /var/www/lfafront/current/api/public && ln -s ../../client/build/ build`

  - Browse your static frontend: https://10.0.0.10

## Update your API base path

In the `app/config/routing.yaml` add a prefix for your api, it can be somethings like that:

```yaml
api:
    resource: '.'
    type:     'api_platform'
    prefix:   '/api'  # This line can be added
```

Then your API is available at https://10.0.0.10/app_dev.php/api
