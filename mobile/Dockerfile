FROM chiticariu/xamarin-android:latest

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN nuget restore

# RUN msbuild /t:Build

RUN msbuild /t:SignAndroidPackage /p:"AndroidSdkDirectory"=$ANDROID_HOME /p:Configuration=Release Area.Android

CMD tail -f /dev/null
