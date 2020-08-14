# Multi Docker

> Developed MERN application using mutli container docker. Finally tested and deployed on AWS ElasticBeanStalk using Travis CI tool

---

### Some Key Points

1. Dockerfile.dev is used to build image for developement and testing
2. Dockerfile is used for production image of react application
3. .travis.yml is used for CI/CD with [Travis CI](https://travis-ci.org/)
4. Build docker containers using **docker-compose up** command
5. Stop running docker containers with **docker-compose down** command
