#!/bin/bash

# 현재 폴더명으로 프로젝트 구분
FOLDER=$(basename "$PWD")

if [ "$FOLDER" = "plango" ]; then
  REMOTE_URL="https://github.com/kds6536/plango.git"
elif [ "$FOLDER" = "plango-admin" ]; then
  REMOTE_URL="https://github.com/kds6536/plango-admin.git"
else
  echo "이 폴더는 등록된 프로젝트가 아닙니다."
  exit 1
fi

# 현재 remote가 올바른지 확인
CURRENT_REMOTE=$(git remote get-url origin)
if [ "$CURRENT_REMOTE" != "$REMOTE_URL" ]; then
  echo "remote를 $REMOTE_URL 로 변경합니다."
  git remote set-url origin "$REMOTE_URL"
fi

# add/commit/push
if [ -z "$1" ]; then
  echo "커밋 메시지를 입력하세요. 예: bash push-safe.sh '메시지'"
  exit 1
fi

git add .
git commit -m "$1"
git push origin main 