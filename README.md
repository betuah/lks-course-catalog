

# Course Catalog Service
Course catalog service is a part of course app API backend services to handle catalog functionality.

## TechStack

Course Catalog uses a number of technology stack to work properly:
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [Sequelize] - modern TypeScript and Node.js ORM for database
- [Mocha] - JavaScript test framework running on Node.js and in the browser
- [aws-ssm] - store configuration data securely with parameter store by AWS
- [S3] - Storing data assets with object storage
- [postgres] - Most Advanced Open Source Relational Database in the world

## API Endpoint

You can check the API endpoint documentation in [here]

## Installation and setup

#### Environment Variable

Course catalog service need IAM user to comunicate with other AWS services like SSM Parameter Store and S3 Bucket. You need to grand access for SSM Parameter store to get parameter store by path and S3 to put, get and delete the object.

The following bellow is a list of the environments to store the access and secret key for IAM User.

| KEY | Required | Description  |
|--|--|--|
| **AWS_ACCESS_KEY** | ***true*** | Aws access key to access the parameter store and S3 bucket |
|**AWS_SECRET_KEY**| ***true*** | Aws secret key to access the parameter store and S3 bucket |

> **Note** : This environment is mandatory so you have to attach this environment on every platform you run on. If your want to run env variable in local machine, you need to create **.env.production** and **.env.testing** by filling the key and value in the table above

#### Parameter Store
Course Catalog Service is using several services that exist in AWS such as S3, RDS, and CloudFront with all service configurations stored in the SSM Parameter Store. The Parameter store Name is use hierarchy path like `/course-catalog/{{ENVIRONMENT}}/{{KEY}}`, you can change `{{ENVIRONMENT}}` with `production` for production use or `testing` for testing use. The `{{KEY}}` must be strict with key name in the table below.

<br/>

> ***Example*** : `/course-catalog/production/AWS_BUCKET_NAME`

<br/>

> **Note** : Be careful to write the key. The wrong key and case sensitive will have an effect and can cause the value not to be read by the application. You have to create the parameter store one by one until all key have been generated.

<br>

| KEY NAME  | Parameter Type | Description  |
|--|--|--|
| **AWS_BUCKET_NAME** | String | Bucket name is use to store assets data like catalog *thumnail*. |
|**AWS_BUCKET_REGION**| String | Region of the bucket is used |
| **AWS_CF_KEY_PAIR_ID** | SecureString | CloudFront public key pair id |
| **AWS_CF_PRIVATE_KEY** | SecureString | CloudFront private key |
| **AWS_CF_URL** | String | CloudFont distribution URL |
| **DB_HOST** | String | Database host |
| **DB_NAME** | String | Database name |
| **DB_USER** | String | Database username |
| **DB_PASSWORD** | SecureString | Database password |

#### Run Unit Test
You can easily run unit tests for Course Catalog Services for production test with the following command:

```sh
npm install
npm run test 
```
these command will be generate `test-result.xml` file in **report** folder with JUnit format. If you want to show the testing result in the terminal, just following this command bellow :
```sh
npm install
npm run testdev
```

#### Run the server
Course Catalog requires [Node.js](https://nodejs.org/) v16+ to run.
Install the dependencies and start the server.

```sh
npm install
npm run start
```

### Run with Docker

Course catalog is very easy to install and deploy in a Docker container.
By default, the Docker will expose port 8000 for production and port 9000 for testing, When ready, simply use the Dockerfile to build the image.

```sh
docker build -t <name_tag> .
```
You can change `<name_tag>` with image name whatever you want. Let me gift you some example :
```sh
docker build -t course-catalog:latest .
```
or if you want to push the image to some docker registry repository like ECR just change the `<name_tag>` with the repository url, for example :

```sh
docker build AWS_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/course-catalog:latest .
```
Once done, you can run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8080 of the host to port 8000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8080:8000 --name=course-catalog-container <name_tag>
```

Verify the API by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8080
```

### Deploy to AWS Beanstalk
You can deploy to aws beanstalk if you already created the image and upload it to the docker registry like ECR. First step to deploy your image into aws beanstalk, you need to create Dockerrun.aws.json file in this repository with this following json format:
```json
{
   "AWSEBDockerrunVersion": "1",
   "Authentication": {
      "Bucket": "YOUR_BUCKET", 
      "Key": "YOUR_CONFIG_FILE_IN_BUCKET"
   },
   "Image": {
      "Name": "YOUR_IMAGE_REPOSITORY"
   },
   "Ports": [
      {
         "ContainerPort": 8000,
         "HostPort": 80
      }
   ]
}
```
Description:
- AWSEBDockerrunVersion is dockerrun version for create the container, 1 is mean for single container and 2 is for multi container.
- Authentication is use for authenticate to private docker registry like ECR.
- Authentication > bucket is where you put the dkcfg (Docker config) file for the credential.
- Authentication > key is the credential file name in the selected bucket, for example, config.json or dkcfg.
- Image is what you image url on ECR or other docker registry


This is the example of config.json file for ECR credential:
```json
{
  "auths": {
    "YOUR_AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com": {
      "auth": "YOUR_ECR_AUTH_TOKEN"
    }
  }
}
```
> **Note:** Dont forget to give permission aws beanstalk to get object from S3. You can create the ECR auth token with aws cli command `aws ecr get-login-password --region {{ECR_REGION}}` and copy the result to config.json file.

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/betuah/lks-course-catalog>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [node.js]: <http://nodejs.org>
   [sequelize]: <https://sequelize.org>
   [express]: <http://expressjs.com>
   [Mocha]: <https://mochajs.org/>
   [AWS-SDK]: <https://aws.amazon.com/id/sdk-for-javascript/#:~:text=The%20AWS%20SDK%20for%20JavaScript%20simpli%EF%AC%81es%20use%20of%20AWS%20Services,marshaling%2C%20serialization%2C%20and%20deserialization.>
   [aws-ssm]: <https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html>
   [here]: <https://documenter.getpostman.com/view/2061573/2s83zcRS5z>
   [S3]: <https://aws.amazon.com/id/s3>
   [postgres]: <https://www.postgresql.org/>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
