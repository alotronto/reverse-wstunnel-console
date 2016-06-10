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
 *Date 03/04/2014 
**/

module.exports = {
    main : function(){
        mainHelpFucntion();
    },
    
    showCommand : function(){
        showCommandHelpFucntion();
    },
    
    newCommand : function(){
        newCommandHelpFucntion();
    },
    
    rmCommand : function(){
        removeCommandHelpFucntion();
    },
    
    startCommand : function(){
        startCommandHelpFucntion();
    }
};

//module.exports = help; 
 
 
 
/**
 *THE FUNCTION IS USED TO PRINT ON THE CONSOLE THE HELP FOR THE "NEW" COMMAND   
 * 
 **/
function newCommandHelpFucntion(){
  console.log('"new" command is used to create a new instance of client/server. ');
  console.log('The syntax of the command is the follows:');
  console.log('');
  console.log('new [client/server] -name name')
  console.log('');
}

/**
 *THE FUNCTION IS USED TO PRINT ON THE CONSOLE THE HELP FOR THE "RM" COMMAND   
 * 
 **/
function removeCommandHelpFucntion(){
    console.log('"rm" command is used to remove a specific instance of client/server. ');
    console.log('The syntax of the command is the follows:');
    console.log('');
    console.log('rm [client/server] -name name')
    console.log('');
}

/**
 *THE FUNCTION IS USED TO PRINT ON THE CONSOLE THE HELP FOR THE "START" COMMAND   
 * 
 **/
function startCommandHelpFucntion(){
  console.log('"start" command is used to run a client or server.');
  console.log('The syntax of the command is the follows:');
  console.log('');
  console.log('start [CLIENT/SERVER] -name NAME -lport PORT -rport PORT -swHost [WS://IP:PORT]')
  console.log('');
}
/**
 *THE FUNCTION IS USED TO PRINT ON THE CONSOLE THE HELP FOR THE "SHOW" COMMAND   
 **/
function showCommandHelpFucntion(){
  console.log('"show" command is used to show the list of clients, servers or both ');
  console.log('that are created by the user during the wrt-c session');
  console.log('The syntax of the command is the follows:');
  console.log('');
  console.log('show [client/server/all]');
  console.log('');
}

/**
 *THE FUNCTION IS USED TO PRINT ON THE CONSOLE THE MAIN HELP   
 **/
function mainHelpFucntion(){
            console.log('');
            console.log('WRT-CONSOLE HELP:');
            console.log('');
            console.log('If you want exit from wrt-c you can use the "exit"');
            console.log('command.');
            console.log('');
            console.log('Using "new" command you can create a client or a server');
            console.log('that uses the websocket reverse tunnel protocol.');
            console.log('"new ?" for command help');
            console.log('');
            console.log('Using "rm" command you can remove a client or a server');
            console.log('that are previously created by the user.');
            console.log('"rm ?" for command help');
            console.log('');
            console.log('Using "show" command you can list clients, server or both');
            console.log('that are created by the user during the wrt-c session.');
            console.log('"show ?" for command help');
            console.log('');
            console.log('Using "start" command if you want to start client or server');
            console.log('that are previously created during the wrt-c session.');
            console.log('"start ?" for command help');
            console.log('');
}