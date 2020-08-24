# Favorite Product Challange

Project developed to store favorite products for customers

Before executing any commands, remember to install dependencies:
```
npm install
```

# Testing

## Unit testing

Run command:
```
npm run test:unit
```

## Mutation Testing

Run command:
```
npm run test:mutation
```

# Running project locally

1. Run and instance of mongodb:
    ```
    docker run -d -p 27017:27017 --name mongo mongo
    ```
1. Run project
    ```
    npm run dev
    ```

# Run with docker

Run command:
```
docker-compose up
```

## Testing

An json with a collection for insomnia is attached