path=`dirname $0`
cd $path
if [ ! -d bower_components ];then
    bower install
fi
