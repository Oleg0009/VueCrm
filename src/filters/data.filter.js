export default function dataFilter( value, format= 'date'){
  const options={};
  if( format.includes("data")){
    options.day='2-digit';
    options.month='long';
    options.year='numeric';
  }
  if( format.includes("time") ){
    options.second='2-digit';
    options.minute='2-digit';
    options.hour='2-digit';
  }
  return new Intl.DateTimeFormat('ru-RU',options).format(new Date(value));
}
