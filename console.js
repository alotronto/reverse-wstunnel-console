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
          case 'rm':
            switch (splittedChunk[1]) {
              case '?':
                help.rmCommand();
                break;
              case 'client':
                if(splittedChunk[2] === '-name' && splittedChunk[3] != null && splittedChunk[3] != ''){
                  removeCSObject('client',splittedChunk[3]);
                 }
                break;
              case 'server':
                if(splittedChunk[2] === '-name' && splittedChunk[3] != null && splittedChunk[3] != ''){
                  removeCSObject('server',splittedChunk[3]);
                 }
                break;
              default:
              errors.syntax();
            }
            break;
          case 'new':
          switch (splittedChunk[1]) {
            case '?':
              help.newCommand();
              //showNewHelp();
              break;
            case 'client':
              if(splittedChunk[2] === '-name' && splittedChunk[3] != null && splittedChunk[3] != ''){
                //addClient(splittedChunk[3]);
                addCSObject('client',splittedChunk[3]);
              }
              else{
                errors.syntax();
              }
              break;
            case 'server':
              if(splittedChunk[2] === '-name' && splittedChunk[3] != null && splittedChunk[3] != ''){
                //addServer(splittedChunk[3]);
                addCSObject('server',splittedChunk[3]);
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
                break;
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
          case 'start':
            switch (splittedChunk[1]) {
              case '?':
                help.startCommand();
              break;
              case 'client':
                if(checkStartClientCommand(splittedChunk)){
                  startClient(splittedChunk[3],splittedChunk[9],splittedChunk[7],splittedChunk[5]);
                }
                else{
                  errors.syntax();
                }
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
          case 'rm':
            errors.syntax();
            break;
          case 'show':
            errors.syntax();
            break;
          case 'start':
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
 *ADDS A NEW CLIENT OBJ INTO ARRAY OF CLIENT OBJECTS 
 **/
 
/*function addClient(clientName){
  //NEW INSTANCE OF wts.client_reverse();
  var reverseClient = new wts.client_reverse();
  var nameIsPresent = false;
  
  if(clients.length > 0){
    clients.forEach(function(obj) {
      if(obj.name == clientName)
        nameIsPresent = true;
    })
  }
  if(!nameIsPresent){
    //PUSH OBJECT FOR THE NEW INSTANCE OF REVERSE CLIENT
    clients.push( { name: clientName, revCli: reverseClient } );
    console.log('A new reverse client with name: '+ clientName + ' is created ;)');
  }
  else{
    console.log('A new reverse client with name: '+ clientName + ' is not created');
    console.log('the name you have inserted is just present :(');
    console.log('Try again with a new name');
  }
}*/

/**
 *ADDS A NEW SERVER OBJ INTO ARRAY OF SERVER OBJECTS 
 **/

/*function addServer(serverName){
  //NEW INSTANCE OF wts.server_reverse();
  var reverseServer = new wts.server_reverse();
  //PUSH OBJECT FOR THE NEW INSTANCE OF REVERSE SERVER 
  servers.push( { name: serverName, revServ: reverseServer } );
  console.log('A new reverse server with name:'+ serverName + 'is created ;)');
}*/

/**
 *THE FUCNTION IS USED TO ADD A NEW CLIENT OR SERVER OBJECT INTO THE 
 *SPECIFIC ARRAY OF OBJECTS  
 **/

function addCSObject(type, name){
  //NEW INSTANCE OF wts.client_reverse();
  //var reverseClient = new wts.client_reverse();
  var nameIsPresent = checkName(type,name);
  
  if(!nameIsPresent){
    //PUSH OBJECT FOR THE NEW INSTANCE OF REVERSE CLIENT
    if(type === 'client'){
      var reverseClient = new wts.client_reverse;
      clients.push( { name: name, revCli: reverseClient } );
      console.log('A new reverse client with name: '+ name + ' is created ;)');
    }
    else{
      var reverseServer = new wts.server_reverse;
      servers.push( { name: name, revCli: reverseServer } );
      console.log('A new reverse server with name: '+ name + ' is created ;)');
    }
  }
  else{
    console.log('A new reverse '+type+' with name: '+ name + ' is not created');
    console.log('the name you have inserted is just present :(');
    console.log('Try again with a new name');
  }
}

/**
 *THE FUCNTION IS USED TO REMOVE A CLIENT OR SERVER OBJECT FROM THE 
 *SPECIFIC ARRAY OF OBJECTS  
 **/
function removeCSObject(type, name){
  var nameIsPresent = checkName(type,name);
  if(nameIsPresent){
    if(type === 'client'){
      var index;
      clients.some(function(entry, i) {
        if (entry.name === name) {
          index = i;
          return true;
        }
      });
      clients.splice(index, 1); 
      console.log('The reverse client with name: '+ name + ' is removed ;)');
    }
    else{
      var index;
      servers.some(function(entry, i) {
      if (entry.name === name) {
          index = i;
          return true;
        }
      });
      servers.splice(index, 1); 
      console.log('The reverse server with name: '+ name + ' is removed ;)');
    }
  }
  else{
    console.log('There is no '+type+' with the inserted name');
  }
}


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
          console.log(obj.name);
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
          console.log(obj.name);
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
          console.log(obj.name);
        });
      else
        console.log('There are not clients');

      console.log('');
      console.log('List of servers:');
      if(servers.length > 0)
        servers.forEach(function(obj) {
          console.log(obj.name);  
        });
      else
        console.log('There are not servers');
      console.log('');
      break;
    default:
      // code
  }
}


function startClient(clientName, serverIp, remotePort, localPort){
  if(checkName('client',clientName)){
    clients.forEach(function(obj) {
      if(obj.name === clientName){
        console.log('true');
        obj.revCli.start(remotePort,serverIp,localPort);
      }
    });
  }
  else{
    console.log('ERRORE');
  }
}


/**
 *UTILITY FUNCTION 
 * THE FUNCTION RETURNS TRUE IF THE INSERTED IS PRESENT IN THE SERVERS/CLIENTS
 * ARRAY OF OBJECTS
 **/
function checkName(type, name){
   var nameIsPresent = false;
  if(type === 'client'){
    if(clients.length > 0){
      clients.forEach(function(obj) {
        if(obj.name == name)
          nameIsPresent = true;
      });
    }
  }
  else{
    if(servers.length > 0){
      servers.forEach(function(obj) {
        if(obj.name == name)
          nameIsPresent = true;
      });
    }
  }
  return nameIsPresent;
}

function checkStartClientCommand(splitArray){
  var isCorrect = false;
  if(splitArray[2] === '-name' && 
      splitArray[3] != null && splitArray[3] != '' &&
      splitArray[4] == '-lport' &&
      splitArray[5] != null && splitArray[5] != '' && !isNaN(splitArray[5]) &&
      splitArray[6] == '-rport' &&
      splitArray[7] != null && splitArray[7] != '' && !isNaN(splitArray[7]) &&
      splitArray[8] == '-swHost' &&
      splitArray[9].split(':').length == 3
      )
      isCorrect = true;
  
  return isCorrect;    

}