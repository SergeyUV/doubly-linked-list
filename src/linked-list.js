const Node = require('./node');

class LinkedList {
    
    constructor() {
        this._tail = null;
        this._head = null;
        this.length = 0;
    }

    append(data) {
        let newNode = new Node(data);
        this.length += 1;

        if(this._tail){
            newNode.prev = this._tail;
            this._tail.next = newNode;
            this._tail = newNode;
            newNode = null;
        }
        else{
            this._tail = newNode;
            this._head = newNode;
        }
        
        return this;
    }

    head() {
        if(!this._head) return null;
        
        return this._head.data;
    }

    tail() {
        if(!this._head) return null;
        
        return this._tail.data;
    }

    at(index) {
        if(index < 0) return null;
        
        let returnNode = this._head;
        for(let i=0; i < index; i++){
            if(returnNode){
                returnNode = returnNode.next;
            }
            else{
                break;
            }
        }
        
        if(returnNode){
            return returnNode.data;
        }
        else{
            return returnNode;
        }
    }

    insertAt(index, data) {
        
        if(index >= this.length){   
           this.append(data);
           return this; 
        }
        
        let newNode = new Node(data);
        
        if(index == 0){
            newNode.next = this._head;
            this._head.prev = newNode;
            this._head = newNode;
            this.length += 1;
            return this;
        }

        let nodeToMoveToTail = this._head.next;
        
        for(let i=1; i < index && i < this.length; i++){
            nodeToMoveToTail = nodeToMoveToTail.next;
        }
        newNode.next = nodeToMoveToTail;
        newNode.prev = nodeToMoveToTail.prev;
        nodeToMoveToTail.prev.next = newNode;
        nodeToMoveToTail.prev=newNode;
        this.length += 1;
    
        return this;   
    }

    isEmpty() {
        if(!this._head) return true;

        return false;
    }

    clear() {
        this._tail = null;
        this._head = null;
        this.length = 0; 
        return this; 
    }

    deleteAt(index) {
        if(!this.length ) return this;
        if(index >= this.length) return this;
        
        if(index == 0){
            if(this.length==1){
                this._tail = null;
                this._head = null;
            }
            else{
                this._head = this._head.next;
                this._head.prev = null;
            }
        }
        else if(index == this.length-1){
            this._tail = this._tail.prev;
            this._tail.next = null;
        }
        else{
            let nodeToDelete = this._head.next;
            
            for(let i=1; i < index && i < this.length; i++){
                nodeToDelete = nodeToDelete.next;
            }
            
            nodeToDelete.prev.next = nodeToDelete.next;
            nodeToDelete.next.prev = nodeToDelete.prev;
        }
        
        this.length -= 1;
        return this;
    }

    reverse() {
        let node = this._head;
        
        while(node){
            let tmp_prev = node.prev;
            node.prev = node.next;
            node.next = tmp_prev;
            node = node.prev;
        }
        
        let tmp_head = this._head;
        this._head = this._tail;
        this._tail = tmp_head;

        return this;
    }

    indexOf(data) {
        let index = -1;
        let i = 0;
        let lnode = this._head;
        
        while(lnode){
            if(lnode.data === data) {
                index = i;
                break;
            }
            lnode = lnode.next;
            i++;
        }

        return index;
    }
}

module.exports = LinkedList;
