import serverFunc from './src/server/server';
import watch from './src/client/watch';

if (typeof porcess === 'undefined') watch();
else serverFunc();
