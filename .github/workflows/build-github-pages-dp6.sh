#!/bin/bash
  
username=$1
token=$2

# List of all repositories with org = DP6 and public
output=$(curl   -H "Accept: application/vnd.github.v3+json"   https://api.github.com/search/repositories?q=is%3Apublic%20org%3Adp6 | jq '.[]' | jq '[.[] | select(.homepage != null) | {name: .name, homepage:.homepage}]')

echo  $output | jq '.'

for row in $(echo "${output}" | jq -r '.[] | @base64'); do
    _jq() {
     echo ${row} | base64 --decode | jq -r ${1}
    }

    repo=$(_jq '.name')

   echo "Update gh-pages $repo"
   # Deploy Github pages
   response=$(curl -u $username:$token -X POST https://api.github.com/repos/dp6/$repo/pages/builds -H "Accept: application/vnd.github.mister-fantastic-preview+json")
   echo $response | jq '.'
done