# c2 - 2 Mediator, 2 Node Medusa Cluster

Configuration and build scripts to test/run a Medusa cluster locally.

These build scripts are designed to run all mediators and nodes in the same memory space.

## Requirements

* need at least 16Gbytes free - 4Gb x 4

## Machine configuration
<code>/etc/hosts:
127.0.0.1       mediator1
127.0.0.1       mediator2
127.0.0.1       node1
127.0.0.1       node2
</code>

## Build scripts
### nodes
1. `foam-medusa/deployment/c2-mn/build-1.sh [-j]`
1. `foam-medusa/deployment/c2-mn/build-2.sh [-j]`

### mediators
1. `foam-medusa/deployment/c2-mm/build-1.sh`
1. `foam-medusa/deployment/c2-mm/build-2.sh`

## Website
### User / Themed website

* `https://mediator1:8100`
* `https://mediator2:8110`

### Admin access

* `https://localhost:8100`
* `https://localhost:8110`

## Notes
* To drop node ledger - build the node with the -j
* All builds execute cleanAll - future build support may eliminate this requirement. 
