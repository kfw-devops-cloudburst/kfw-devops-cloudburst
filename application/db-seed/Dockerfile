FROM mongo

COPY initialLoad.csv /initialLoad.csv
# COPY wait-for-it.sh /wait-for-it.sh
# CMD /wait-for-it.sh -h $HOST -p $PORT -t 10 -- mongoimport --host $HOST:$PORT --db dobook --collection books  --type csv --file /initialLoad.csv  --headerline
CMD mongoimport --uri $URI --collection books --type csv --file /initialLoad.csv --headerline
