#!/bin/bash

FILEPATH="./components/$1.js"

if test -f "$FILEPATH"; then
    echo -e "File at path $FILEPATH already exists.\n\
Please change the filename or remove existing file!"
    exit 1
fi

echo -n """import React from 'react'

const $1 = () => {
  return (
    <>
      <p>$1</p>
    </>
  )
}

export default $1""" > "./components/$1.js"
echo "Component created successfully to $FILEPATH"