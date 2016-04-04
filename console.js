//###############################################################################
//##
//# Copyright (C) 2016 Andrea Rocco Lotronto
//##
//# Licensed under the Apache License, Version 2.0 (the "License");
//# you may not use this file except in compliance with the License.
//# You may obtain a copy of the License at
//##
//# http://www.apache.org/licenses/LICENSE-2.0
//##
//# Unless required by applicable law or agreed to in writing, software
//# distributed under the License is distributed on an "AS IS" BASIS,
//# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//# See the License for the specific language governing permissions and
//# limitations under the License.
//##
//###############################################################################

/**
 *Date 02/04/2014 
 **/

var wts = require ('node-reverse-wstunnel');
var help = require('./lib/help.js');
var messages = require('./lib/messages.js');
var errors = require('./lib/errors.js');
//GLOBAL VARIABLES
var clients = [];
var servers = [];


//WELLCOME MESSAGE
messages.wellcome();

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    
    if (chunk != null){
      //remove line break from chunk
      var filteredChunk = chunk.toString().replace(/(\n)/gm, "");
      //split the command line
      var splittedChunk = filteredChunk.split(" ");                       
      //check if the command is without paramiters
      if(splittedChunk.length > 1){
        switch (splittedChunk[0]) {
          case 'new':
          switch (splittedChunk[1]) {
            case '?':
              help.newCommand();
              //showNewHelp();
              break;
            case 'client':
              if(splittedChunk[2] === '-name' && splittedChunk[3] != null && splittedChunk[3] != ''){
                addClient(splittedChunk[3]);
              }
              else{
                errors.syntax();
              }
              break;
            case 'server':
              if(splittedChunk[2] === '-name' && splittedChunk[3] != null && splittedChunk[3] != ''){
                addServer(splittedChunk[3]);                
              }
              else{
                errors.syntax();
              }
              break;
            default:
              errors.syntax();
          }  
          break;
          case 'show':
            switch (splittedChunk[1]) {
              case '?':
                help.showCommand();
                break;
              case 'client':
                showList('client');
                break
              case 'server':
                showList('server');
                break;
              case 'all':
                showList('all');
                break;
              default:
                errors.syntax();
            }
            break;
          default:
            errors.wrongCommand();
        }
      }
      else if(splittedChunk.length == 1 && splittedChunk != ''){
        switch (splittedChunk[0]) {
          //Exit from wrt-c console killing the process of node application
          case 'exit':
            console.log('');
            console.log("Good bye ;)");
            console.log('');
            process.exit();
            break;
          //Show help information  
          case 'help':
            help.main();
            break;
          
          case 'new':
            errors.syntax();
            break;
            
          case 'show':
            errors.syntax();
            break;
          
          default:
            errors.wrongCommand();
        }
      }
    }
    //Show default wrt-c prompt
    process.stdout.write('wrt-c %:');
});


/**
 *THE FUNCTION IS USED TO PRINT ONT THE CONSOLE THE LIST OF CLIENTS OR SERVERS
 * OR BOTH
 **/
function showList(command){
  switch (command) {
    case 'client':
      console.log('');
      console.log('List of clients:');
      if(clients.length > 0)
        clients.forEach(function(obj){
          console.log(obj.nome);
        });
      else
        console.log('There are not clients');
      console.log('');
      break;
    case 'server':
      console.log('');
      console.log('List of servers:');
      if(servers.length > 0)
        servers.forEach(function(obj){
          console.log(obj.nome);
        });
      else
        console.log('There are not servers');
      console.log('');
      break;
    case 'all':

      console.log('');
      console.log('List of clients:');
      if(clients.length > 0)
        clients.forEach(function(obj){
          console.log(obj.nome);
        });
      else
        console.log('There are not clients');

      console.log('');
      console.log('List of servers:');
      if(servers.length > 0)
        servers.forEach(function(obj) {
          console.log(obj.nome);  
        });
      else
        console.log('There are not servers');
      console.log('');
      break;
    default:
      // code
  }
}

/**
 *ADDS A NEW CLIENT OBJ INTO ARRAY OF CLIENT OBJECTS 
 **/
function addClient(clientName){
  //NEW INSTANCE OF wts.client_reverse();
  var reverseClient = new wts.client_reverse();
  //PUSH OBJECT FOR THE NEW INSTANCE OF REVERSE CLIENT
  clients.push( { nome: clientName, revCli: reverseClient } );
  console.log('A new reverse client with name: '+ clientName + 'is created ;)');
}

/**
 *ADDS A NEW SERVER OBJ INTO ARRAY OF SERVER OBJECTS 
 **/
function addServer(serverName){
  //NEW INSTANCE OF wts.server_reverse();
  var reverseServer = new wts.server_reverse();
  //PUSH OBJECT FOR THE NEW INSTANCE OF REVERSE SERVER 
  servers.push( { nome: serverName, revServ: reverseServer } );
  console.log('A new reverse server with name:'+ serverName + 'is created ;)');
}

function startClient(serverIp, remotePort, localPort){
}