declare namespace vis {
    /**
     * Ensures that all elements are removed first up so they can be recreated cleanly
     * @param {Object} JSONcontainer
     */
    export function resetElements(JSONcontainer: any): void;

    /**
     * Allocate or generate an SVG element if needed. Store a reference to it in the JSON container and draw it in the svgContainer
     * the JSON container and the SVG container have to be supplied so other svg containers (like the legend) can use this.
     * @param {string} elementType
     * @param {Object} JSONcontainer
     * @param {Element} DOMContainer
     * @param {Element} insertBefore
     * @returns {*}
     */
    export function getDOMElement(elementType: string, JSONcontainer: any, DOMContainer: any, insertBefore: any): any;

    /**
     * Draw a point object. This is a separate function because it can also be called by the legend.
     * The reason the JSONcontainer and the target SVG svgContainer have to be supplied is so the legend can use these functions
     * as well.
     * @param {number} x
     * @param {number} y
     * @param {Object} groupTemplate: A template containing the necessary information to draw the datapoint e.g., {style: 'circle', size: 5, className: 'className' }
     * @param {Object} JSONcontainer
     * @param {Object} svgContainer
     * @param {Object} labelObj
     * @returns {PointItem}
     */
    export function drawPoint(x: number, y: number, groupTemplate: any, JSONcontainer: any, svgContainer: any, labelObj: any): PointItem;

    /**
     * draw a bar SVG element centered on the X coordinate
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} className
     * @param {Object} JSONcontainer
     * @param {Object} svgContainer
     * @param {string} style
     */
    export function drawBar(x: number, y: number, width: number, height: number, className: string, JSONcontainer: any, svgContainer: any, style: string): void;

    /**
     * DataSet
     * // TODO: add a DataSet constructor DataSet(data, options)
     * Usage:
     *     var dataSet = new DataSet({
     *         fieldId: '_id',
     *         type: {
     *             // ...
     *         }
     *     });
     *     dataSet.add(item);
     *     dataSet.add(data);
     *     dataSet.update(item);
     *     dataSet.update(data);
     *     dataSet.remove(id);
     *     dataSet.remove(ids);
     *     var data = dataSet.get();
     *     var data = dataSet.get(id);
     *     var data = dataSet.get(ids);
     *     var data = dataSet.get(ids, options, data);
     *     dataSet.clear();
     * A data set can:
     * - add/remove/update data
     * - gives triggers upon changes in the data
     * - can  import/export data in various data formats
     * @param {Array} [data]    Optional array with initial data
     * @param {Object} [options]   Available options:
     *                             {string} fieldId Field name of the id in the
     *                                              items, 'id' by default.
     *                             {Object.<string, string} type
     *                                              A map with field names as key,
     *                                              and the field type as value.
     *                             {Object} queue   Queue changes to the DataSet,
     *                                              flush them all at once.
     *                                              Queue options:
     *                                              - {number} delay  Delay in ms, null by default
     *                                              - {number} max    Maximum number of entries in the queue, Infinity by default
     * @constructor DataSet
     */
    export class DataSet {
        constructor(data?: any, options?: any);

        /**
         * @param {Object} options   Available options:
         *                             {Object} queue   Queue changes to the DataSet,
         *                                              flush them all at once.
         *                                              Queue options:
         *                                              - {number} delay  Delay in ms, null by default
         *                                              - {number} max    Maximum number of entries in the queue, Infinity by default
         */
        setOptions(options: any): void;

        /**
         * Subscribe to an event, add an event listener
         * @param {string} event        Event name. Available events: 'put', 'update',
         *                              'remove'
         * @param {function} callback   Callback method. Called with three parameters:
         *                                  {string} event
         *                                  {Object | null} params
         *                                  {string | number} senderId
         */
        on(event: string, callback: any): void;

        /**
         * TODO: remove this deprecated function some day (replaced with `on` since version 0.5, deprecated since v4.0)
         * @throws {Error}
         */
        subscribe(): void;

        /**
         * Unsubscribe from an event, remove an event listener
         * @param {string} event
         * @param {function} callback
         */
        off(event: string, callback: any): void;

        /**
         * Add data.
         * Adding an item will fail when there already is an item with the same id.
         * @param {Object | Array} data
         * @param {string} [senderId] Optional sender id
         * @return {Array.<string|number>} addedIds      Array with the ids of the added items
         */
        add(data: any | any, senderId?: string): (string | number)[];

        /**
         * Update existing items. When an item does not exist, it will be created
         * @param {Object | Array} data
         * @param {string} [senderId] Optional sender id
         * @return {Array.<string|number>} updatedIds     The ids of the added or updated items
         */
        update(data: any | any, senderId?: string): (string | number)[];

        /**
         * Get a data item or multiple items.
         * Usage:
         *     get()
         *     get(options: Object)
         *     get(id: number | string)
         *     get(id: number | string, options: Object)
         *     get(ids: number[] | string[])
         *     get(ids: number[] | string[], options: Object)
         * Where:
         * {number | string} id         The id of an item
         * {number[] | string{}} ids    An array with ids of items
         * {Object} options             An Object with options. Available options:
         * {string} [returnType]        Type of data to be returned.
         *                              Can be 'Array' (default) or 'Object'.
         * {Object.<string, string>} [type]
         * {string[]} [fields]          field names to be returned
         * {function} [filter]          filter items
         * {string | function} [order]  Order the items by a field name or custom sort function.
         * @param {Array} args
         * @returns {DataSet}
         * @throws Error
         */
        get(args: any): DataSet;

        /**
         * Get ids of all items or from a filtered set of items.
         * @param {Object} [options]    An Object with options. Available options:
         *                              {function} [filter] filter items
         *                              {string | function} [order] Order the items by
         *                                  a field name or custom sort function.
         * @return {Array.<string|number>} ids
         */
        getIds(options?: any): (string | number)[];

        /**
         * Returns the DataSet itself. Is overwritten for example by the DataView,
         * which returns the DataSet it is connected to instead.
         * @returns {DataSet}
         */
        getDataSet(): DataSet;

        /**
         * Execute a callback function for every item in the dataset.
         * @param {function} callback
         * @param {Object} [options]    Available options:
         *                              {Object.<string, string>} [type]
         *                              {string[]} [fields] filter fields
         *                              {function} [filter] filter items
         *                              {string | function} [order] Order the items by
         *                                  a field name or custom sort function.
         */
        forEach(callback: any, options?: any): void;

        /**
         * Map every item in the dataset.
         * @param {function} callback
         * @param {Object} [options]    Available options:
         *                              {Object.<string, string>} [type]
         *                              {string[]} [fields] filter fields
         *                              {function} [filter] filter items
         *                              {string | function} [order] Order the items by
         *                                  a field name or custom sort function.
         * @return {Object[]} mappedItems
         */
        map(callback: any, options?: any): any[];

        /**
         * Remove an object by pointer or by id
         * @param {string | number | Object | Array.<string|number>} id Object or id, or an array with
         *                                              objects or ids to be removed
         * @param {string} [senderId] Optional sender id
         * @return {Array.<string|number>} removedIds
         */
        remove(id: string | number | any | (string | number)[], senderId?: string): (string | number)[];

        /**
         * Clear the data
         * @param {string} [senderId] Optional sender id
         * @return {Array.<string|number>} removedIds    The ids of all removed items
         */
        clear(senderId?: string): (string | number)[];

        /**
         * Find the item with maximum value of a specified field
         * @param {string} field
         * @return {Object | null} item  Item containing max value, or null if no items
         */
        max(field: string): any | any;

        /**
         * Find the item with minimum value of a specified field
         * @param {string} field
         * @return {Object | null} item  Item containing max value, or null if no items
         */
        min(field: string): any | any;

        /**
         * Find all distinct values of a specified field
         * @param {string} field
         * @return {Array} values  Array containing all distinct values. If data items
         *                         do not contain the specified field are ignored.
         *                         The returned array is unordered.
         */
        distinct(field: string): any;

    }

    /**
     * DataView
     * a dataview offers a filtered view on a dataset or an other dataview.
     * @param {DataSet | DataView} data
     * @param {Object} [options]   Available options: see method get
     * @constructor DataView
     */
    export class DataView {
        constructor(data: DataSet | DataView, options?: any);

        /**
         * Set a data source for the view
         * @param {DataSet | DataView} data
         */
        setData(data: DataSet | DataView): void;

        /**
         * Refresh the DataView. Useful when the DataView has a filter function
         * containing a variable parameter.
         */
        refresh(): void;

        /**
         * Get data from the data view
         * Usage:
         *     get()
         *     get(options: Object)
         *     get(options: Object, data: Array | DataTable)
         *     get(id: Number)
         *     get(id: Number, options: Object)
         *     get(id: Number, options: Object, data: Array | DataTable)
         *     get(ids: Number[])
         *     get(ids: Number[], options: Object)
         *     get(ids: Number[], options: Object, data: Array | DataTable)
         * Where:
         * {number | string} id         The id of an item
         * {number[] | string{}} ids    An array with ids of items
         * {Object} options             An Object with options. Available options:
         *                              {string} [type] Type of data to be returned. Can
         *                                              be 'DataTable' or 'Array' (default)
         *                              {Object.<string, string>} [convert]
         *                              {string[]} [fields] field names to be returned
         *                              {function} [filter] filter items
         *                              {string | function} [order] Order the items by
         *                                  a field name or custom sort function.
         * {Array | DataTable} [data]   If provided, items will be appended to this
         *                              array or table. Required in case of Google
         *                              DataTable.
         * @param {Array} args
         * @return {DataSet|DataView}
         */
        get(args: any): DataSet | DataView;

        /**
         * Get ids of all items or from a filtered set of items.
         * @param {Object} [options]    An Object with options. Available options:
         *                              {function} [filter] filter items
         *                              {string | function} [order] Order the items by
         *                                  a field name or custom sort function.
         * @return {Array.<string|number>} ids
         */
        getIds(options?: any): (string | number)[];

        /**
         * Map every item in the dataset.
         * @param {function} callback
         * @param {Object} [options]    Available options:
         *                              {Object.<string, string>} [type]
         *                              {string[]} [fields] filter fields
         *                              {function} [filter] filter items
         *                              {string | function} [order] Order the items by
         *                                  a field name or custom sort function.
         * @return {Object[]} mappedItems
         */
        map(callback: any, options?: any): any[];

        /**
         * Get the DataSet to which this DataView is connected. In case there is a chain
         * of multiple DataViews, the root DataSet of this chain is returned.
         * @return {DataSet} dataSet
         */
        getDataSet(): DataSet;

    }

    /**
     * A queue
     * @param {Object} options
     *            Available options:
     *            - delay: number    When provided, the queue will be flushed
     *                               automatically after an inactivity of this delay
     *                               in milliseconds.
     *                               Default value is null.
     *            - max: number      When the queue exceeds the given maximum number
     *                               of entries, the queue is flushed automatically.
     *                               Default value of max is Infinity.
     * @constructor Queue
     */
    export class Queue {
        constructor(options: any);

        /**
         * Update the configuration of the queue
         * @param {Object} options
         *            Available options:
         *            - delay: number    When provided, the queue will be flushed
         *                               automatically after an inactivity of this delay
         *                               in milliseconds.
         *                               Default value is null.
         *            - max: number      When the queue exceeds the given maximum number
         *                               of entries, the queue is flushed automatically.
         *                               Default value of max is Infinity.
         */
        setOptions(options: any): void;

        /**
         * Extend an object with queuing functionality.
         * The object will be extended with a function flush, and the methods provided
         * in options.replace will be replaced with queued ones.
         * @param {Object} object
         * @param {Object} options
         *            Available options:
         *            - replace: Array.<string>
         *                               A list with method names of the methods
         *                               on the object to be replaced with queued ones.
         *            - delay: number    When provided, the queue will be flushed
         *                               automatically after an inactivity of this delay
         *                               in milliseconds.
         *                               Default value is null.
         *            - max: number      When the queue exceeds the given maximum number
         *                               of entries, the queue is flushed automatically.
         *                               Default value of max is Infinity.
         * @return {Queue} Returns the created queue
         */
        static extend(object: any, options: any): Queue;

        /**
         * Destroy the queue. The queue will first flush all queued actions, and in
         * case it has extended an object, will restore the original object.
         */
        destroy(): void;

        /**
         * Replace a method on an object with a queued version
         * @param {Object} object   Object having the method
         * @param {string} method   The method name
         */
        replace(object: any, method: string): void;

        /**
         * Queue a call
         * @param {function | {fn: function, args: Array} | {fn: function, args: Array, context: Object}} entry
         */
        queue(entry: any | any | any): void;

        /**
         * Flush all queued calls
         */
        flush(): void;

    }

    /**
     * The camera is mounted on a (virtual) camera arm. The camera arm can rotate
     * The camera is always looking in the direction of the origin of the arm.
     * This way, the camera always rotates around one fixed point, the location
     * of the camera arm.
     * Documentation:
     *   http://en.wikipedia.org/wiki/3D_projection
     * @class Camera
     */
    export class Camera {
        /**
         * Set offset camera in camera coordinates
         * @param {number} x offset by camera horisontal
         * @param {number} y offset by camera vertical
         */
        setOffset(x: number, y: number): void;

        /**
         * Get camera offset by horizontal and vertical
         * @returns {number}
         */
        getOffset(): number;

        /**
         * Set the location (origin) of the arm
         * @param {number} x  Normalized value of x
         * @param {number} y  Normalized value of y
         * @param {number} z  Normalized value of z
         */
        setArmLocation(x: number, y: number, z: number): void;

        /**
         * Set the rotation of the camera arm
         * @param {number} horizontal   The horizontal rotation, between 0 and 2*PI.
         *                Optional, can be left undefined.
         * @param {number} vertical   The vertical rotation, between 0 and 0.5*PI
         *                if vertical=0.5*PI, the graph is shown from the
         *                top. Optional, can be left undefined.
         */
        setArmRotation(horizontal: number, vertical: number): void;

        /**
         * Retrieve the current arm rotation
         * @return {object}   An object with parameters horizontal and vertical
         */
        getArmRotation(): any;

        /**
         * Set the (normalized) length of the camera arm.
         * @param {number} length A length between 0.71 and 5.0
         */
        setArmLength(length: number): void;

        /**
         * Retrieve the arm length
         * @return {number} length
         */
        getArmLength(): number;

        /**
         * Retrieve the camera location
         * @return {Point3d} cameraLocation
         */
        getCameraLocation(): (x?: number, y?: number, z?: number) => void;

        /**
         * Retrieve the camera rotation
         * @return {Point3d} cameraRotation
         */
        getCameraRotation(): (x?: number, y?: number, z?: number) => void;

        /**
         * Calculate the location and rotation of the camera based on the
         * position and orientation of the camera arm
         */
        calculateCameraOrientation(): void;

    }

    /**
     * Creates a container for all data of one specific 3D-graph.
     * On construction, the container is totally empty; the data
     * needs to be initialized with method initializeData().
     * Failure to do so will result in the following exception begin thrown
     * on instantiation of Graph3D:
     *     Error: Array, DataSet, or DataView expected
     * @constructor DataGroup
     */
    export class DataGroup {
        /**
         * Initializes the instance from the passed data.
         * Calculates minimum and maximum values and column index values.
         * The graph3d instance is used internally to access the settings for
         * the given instance.
         * TODO: Pass settings only instead.
         * @param {Graph3d}  graph3d Reference to the calling Graph3D instance.
         * @param {Array | DataSet | DataView} rawData The data containing the items for
         *                                             the Graph.
         * @param {number}   style   Style Number
         * @returns {Array.<Object>}
         */
        initializeData(graph3d: Graph3d, rawData: any | DataSet | DataView, style: number): any[];

        /**
         * Creates a list with all the different values in the data for the given column.
         * If no data passed, use the internal data of this instance.
         * @param {'x'|'y'|'z'}                column The data column to process
         * @param {DataSet|DataView|undefined} data   The data containing the items for the Graph
         * @returns {Array} All distinct values in the given column data, sorted ascending.
         */
        getDistinctValues(column: any | any | any, data: DataSet | DataView | any): any;

        /**
         * Determine the smallest difference between the values for given
         * column in the passed data set.
         * @param {DataSet|DataView|undefined} data   The data containing the items for the Graph
         * @param {'x'|'y'|'z'}                column The data column to process
         * @returns {number|null} Smallest difference value or
         *                        null, if it can't be determined.
         */
        getSmallestDifference(data: DataSet | DataView | any, column: any | any | any): number | any;

        /**
         * Get the absolute min/max values for the passed data column.
         * @param {DataSet|DataView|undefined} data   The data containing the items for the Graph
         * @param {'x'|'y'|'z'}                column The data column to process
         * @returns {Range} A Range instance with min/max members properly set.
         */
        getColumnRange(data: DataSet | DataView | any, column: any | any | any): () => void;

        /**
         * Determines the number of rows in the current data.
         * @returns {number}
         */
        getNumberOfRows(): number;

        /**
         * Return all data values as a list of Point3d objects
         * @param {Array.<Object>} data
         * @returns {Array.<Object>}
         */
        getDataPoints(data: any[]): any[];

        /**
         * Return common information, if present
         * @returns {string}
         */
        getInfo(): string;

        /**
         * Reload the data
         */
        reload(): void;

        /**
         * Filter the data based on the current filter
         * @param   {Array} data
         * @returns {Array} dataPoints Array with point objects which can be drawn on
         *                             screen
         */
        _getDataPoints(data: any): any;

    }

    /**
     * @class Filter
     * @param {DataGroup} dataGroup the data group
     * @param {number}  column             The index of the column to be filtered
     * @param {Graph3d} graph              The graph
     */
    export class Filter {
        constructor(dataGroup: DataGroup, column: number, graph: Graph3d);

        /**
         * Return the label
         * @return {string} label
         */
        isLoaded(): string;

        /**
         * Return the loaded progress
         * @return {number} percentage between 0 and 100
         */
        getLoadedProgress(): number;

        /**
         * Return the label
         * @return {string} label
         */
        getLabel(): string;

        /**
         * Return the columnIndex of the filter
         * @return {number} columnIndex
         */
        getColumn(): number;

        /**
         * Return the currently selected value. Returns undefined if there is no selection
         * @return {*} value
         */
        getSelectedValue(): any;

        /**
         * Retrieve all values of the filter
         * @return {Array} values
         */
        getValues(): any;

        /**
         * Retrieve one value of the filter
         * @param {number}  index
         * @return {*} value
         */
        getValue(index: number): any;

        /**
         * Retrieve the (filtered) dataPoints for the currently selected filter index
         * @param {number} [index] (optional)
         * @return {Array} dataPoints
         */
        _getDataPoints(index?: number): any;

        /**
         * Set a callback function when the filter is fully loaded.
         * @param {function} callback
         */
        setOnLoadCallback(callback: any): void;

        /**
         * Add a value to the list with available values for this filter
         * No double entries will be created.
         * @param {number} index
         */
        selectValue(index: number): void;

        /**
         * Load all filtered rows in the background one by one
         * Start this method without providing an index!
         * @param {number} [index=0]
         */
        loadInBackground(index?: number): void;

    }

    /**
     * Graph3d displays data in 3d.
     * Graph3d is developed in javascript as a Google Visualization Chart.
     * @constructor Graph3d
     * @param {Element} container   The DOM element in which the Graph3d will
     *                              be created. Normally a div element.
     * @param {DataSet | DataView | Array} [data]
     * @param {Object} [options]
     */
    export class Graph3d {
        constructor(container: any, data?: DataSet | DataView | any, options?: any);

        /**
         * Calculate the scaling values, dependent on the range in x, y, and z direction
         */
        _setScale(): void;

        /**
         * Convert a 3D location to a 2D location on screen
         * Source: ttp://en.wikipedia.org/wiki/3D_projection
         * @param   {Point3d} point3d  A 3D point with parameters x, y, z
         * @returns {Point2d} point2d  A 2D point with parameters x, y
         */
        _convert3Dto2D(point3d: (x?: number, y?: number, z?: number) => void): (x?: number, y?: number) => void;

        /**
         * Convert a 3D location its translation seen from the camera
         * Source: http://en.wikipedia.org/wiki/3D_projection
         * @param   {Point3d} point3d     A 3D point with parameters x, y, z
         * @returns {Point3d} translation A 3D point with parameters x, y, z This is
         *                                the translation of the point, seen from the
         *                                camera.
         */
        _convertPointToTranslation(point3d: (x?: number, y?: number, z?: number) => void): (x?: number, y?: number, z?: number) => void;

        /**
         * Convert a translation point to a point on the screen
         * @param   {Point3d} translation A 3D point with parameters x, y, z This is
         *                                the translation of the point, seen from the
         *                                camera.
         * @returns {Point2d} point2d     A 2D point with parameters x, y
         */
        _convertTranslationToScreen(translation: (x?: number, y?: number, z?: number) => void): (x?: number, y?: number) => void;

        /**
         * Transfer min/max values to the Graph3d instance.
         */
        _initializeRanges(): void;

        /**
         * Return all data values as a list of Point3d objects
         * @param {DataSet} data
         * @returns {Array.<Object>}
         */
        getDataPoints(data: DataSet): any[];

        /**
         * Filter the data based on the current filter
         * @param   {Array} data
         * @returns {Array} dataPoints Array with point objects which can be drawn on
         *                             screen
         */
        _getDataPoints(data: any): any;

        /**
         * Create the main frame for the Graph3d.
         * This function is executed once when a Graph3d object is created. The frame
         * contains a canvas, and this canvas contains all objects like the axis and
         * nodes.
         */
        create(): void;

        /**
         * Resize the canvas to the current size of the frame
         */
        _resizeCanvas(): void;

        /**
         * Start playing the animation, if requested and filter present. Only applicable
         * when animation data is available.
         */
        animationStart(): void;

        /**
         * Stop animation
         */
        animationStop(): void;

        /**
         * Resize the center position based on the current values in this.xCenter
         * and this.yCenter (which are strings with a percentage or a value
         * in pixels). The center positions are the variables this.currentXCenter
         * and this.currentYCenter
         */
        _resizeCenter(): void;

        /**
         * Retrieve the current camera rotation
         * @returns {object} An object with parameters horizontal, vertical, and
         *                   distance
         */
        getCameraPosition(): any;

        /**
         * Replace the dataset of the Graph3d
         * @param {Array | DataSet | DataView} data
         */
        setData(data: any | DataSet | DataView): void;

        /**
         * Update the options. Options will be merged with current options
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Determine which point drawing method to use for the current graph style.
         */
        setPointDrawingMethod(): void;

        /**
         * Redraw the Graph.
         */
        redraw(): void;

        /**
         * Clear the canvas before redrawing
         */
        _redrawClear(): void;

        /**
         * Redraw the legend based on size, dot color, or surface height
         */
        _redrawLegend(): void;

        /**
         * Redraw the filter
         */
        _redrawFilter(): void;

        /**
         * Redraw the slider
         */
        _redrawSlider(): void;

        /**
         * Redraw common information
         */
        _redrawInfo(): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {Point3d} point3d
         * @param {string} text
         * @param {number} armAngle
         * @param {number} [yMargin=0]
         */
        drawAxisLabelX(ctx: any, point3d: (x?: number, y?: number, z?: number) => void, text: string, armAngle: number, yMargin?: number): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {Point3d} point3d
         * @param {string} text
         * @param {number} armAngle
         * @param {number} [yMargin=0]
         */
        drawAxisLabelY(ctx: any, point3d: (x?: number, y?: number, z?: number) => void, text: string, armAngle: number, yMargin?: number): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {Point3d} point3d
         * @param {string} text
         * @param {number} [offset=0]
         */
        drawAxisLabelZ(ctx: any, point3d: (x?: number, y?: number, z?: number) => void, text: string, offset?: number): void;

        /**
         * Redraw the axis
         */
        _redrawAxis(): void;

        /**
         * Draw a polygon using the passed points and fill it with the passed style and stroke.
         * @param {CanvasRenderingContext2D} ctx
         * @param {Array.<Point3d>} points      an array of points.
         * @param {string} [fillStyle] the fill style to set
         * @param {string} [strokeStyle] the stroke style to set
         */
        _polygon(ctx: any, points: (x?: number, y?: number, z?: number) => void[], fillStyle?: string, strokeStyle?: string): void;

        /**
         * Draw all datapoints for currently selected graph style.
         */
        _redrawDataGraph(): void;

        /**
         * Store startX, startY and startOffset for mouse operations
         * @param {Event}     event     The event that occurred
         */
        _storeMousePosition(event: any): void;

        /**
         * Start a moving operation inside the provided parent element
         * @param {Event}     event     The event that occurred (required for
         *                  retrieving the  mouse position)
         */
        _onMouseDown(event: any): void;

        /**
         * Perform moving operating.
         * This function activated from within the funcion Graph.mouseDown().
         * @param {Event}   event  Well, eehh, the event
         */
        _onMouseMove(event: any): void;

        /**
         * Stop moving operating.
         * This function activated from within the funcion Graph.mouseDown().
         * @param {Event}  event   The event
         */
        _onMouseUp(event: any): void;

        /**
         * @param {Event}  event   The event
         */
        _onClick(event: any): void;

        /**
         * After having moved the mouse, a tooltip should pop up when the mouse is resting on a data point
         * @param {Event}  event   A mouse move event
         */
        _onTooltip(event: any): void;

        /**
         * Event handler for touchstart event on mobile devices
         * @param {Event}  event   The event
         */
        _onTouchStart(event: any): void;

        /**
         * Event handler for touchmove event on mobile devices
         * @param {Event}  event   The event
         */
        _onTouchMove(event: any): void;

        /**
         * Event handler for touchend event on mobile devices
         * @param {Event}  event   The event
         */
        _onTouchEnd(event: any): void;

        /**
         * Event handler for mouse wheel event, used to zoom the graph
         * Code from http://adomas.org/javascript-mouse-wheel/
         * @param {Event}  event   The event
         */
        _onWheel(event: any): void;

        /**
         * Determine if the given style has bars
         * @param   {number} style the style to check
         * @returns {boolean} true if bar style, false otherwise
         */
        hasBars(style: number): boolean;

        /**
         * Set the rotation and distance of the camera
         * @param {Object}  pos            An object with the camera position
         *        {number} [pos.horizontal] The horizontal rotation, between 0 and 2*PI.
         *                                 Optional, can be left undefined.
         *        {number} [pos.vertical]  The vertical rotation, between 0 and 0.5*PI.
         *                                 if vertical=0.5*PI, the graph is shown from
         *                                 the top. Optional, can be left undefined.
         *        {number} [pos.distance]  The (normalized) distance of the camera to the
         *                                 center of the graph, a value between 0.71 and
         *                                 5.0. Optional, can be left undefined.
         */
        setCameraPosition(pos: any): void;

        /**
         * Set a new size for the graph
         * @param {string} width  Width in pixels or percentage (for example '800px'
         *                        or '50%')
         * @param {string} height Height in pixels or percentage  (for example '400px'
         *                        or '30%')
         */
        setSize(width: string, height: string): void;

    }

    /**
     * Get the horizontal mouse position from a mouse event
     * @param   {Event}  event
     * @returns {number} mouse x
     */
    export function getMouseX(event: any): number;

    /**
     * Get the vertical mouse position from a mouse event
     * @param   {Event}  event
     * @returns {number} mouse y
     */
    export function getMouseY(event: any): number;

    /**
     * @prototype Point2d
     * @param {number} [x]
     * @param {number} [y]
     */
    export function Point2d(x?: number, y?: number): void;

    /**
     * @prototype Point3d
     * @param {number} [x]
     * @param {number} [y]
     * @param {number} [z]
     */
    export function Point3d(x?: number, y?: number, z?: number): void;

    /**
     * @prototype Range
     * Helper class to make working with related min and max values easier.
     * The range is inclusive; a given value is considered part of the range if:
     *    this.min <= value <= this.max
     */
    export function Range(): void;

    /**
     * Check if given hash is empty.
     * Source: http://stackoverflow.com/a/679937
     * @param {object} obj
     * @returns {boolean}
     */
    export function isEmpty(obj: any): boolean;

    /**
     * Make first letter of parameter upper case.
     * Source: http://stackoverflow.com/a/1026087
     * @param {string} str
     * @returns {string}
     */
    export function capitalize(str: string): string;

    /**
     * Add a prefix to a field name, taking style guide into account
     * @param {string} prefix
     * @param {string} fieldName
     * @returns {string}
     */
    export function prefixFieldName(prefix: string, fieldName: string): string;

    /**
     * Forcibly copy fields from src to dst in a controlled manner.
     * A given field in dst will always be overwitten. If this field
     * is undefined or not present in src, the field in dst will
     * be explicitly set to undefined.
     * The intention here is to be able to reset all option fields.
     * Only the fields mentioned in array 'fields' will be handled.
     * @param {object} src
     * @param {object} dst
     * @param {array<string>} fields array with names of fields to copy
     * @param {string} [prefix] prefix to use for the target fields.
     */
    export function forceCopy(src: any, dst: any, fields: any, prefix?: string): void;

    /**
     * Copy fields from src to dst in a safe and controlled manner.
     * Only the fields mentioned in array 'fields' will be copied over,
     * and only if these are actually defined.
     * @param {object} src
     * @param {object} dst
     * @param {array<string>} fields array with names of fields to copy
     * @param {string} [prefix] prefix to use for the target fields.
     */
    export function safeCopy(src: any, dst: any, fields: any, prefix?: string): void;

    /**
     * Initialize dst with the values in src.
     * src is the hash with the default values.
     * A reference DEFAULTS to this hash is stored locally for
     * further handling.
     * For now, dst is assumed to be a Graph3d instance.
     * @param {object} src
     * @param {object} dst
     */
    export function setDefaults(src: any, dst: any): void;

    /**
     * @param {object} options
     * @param {object} dst
     */
    export function setOptions(options: any, dst: any): void;

    /**
     * Special handling for certain parameters
     * 'Special' here means: setting requires more than a simple copy
     * @param {object} src
     * @param {object} dst
     */
    export function setSpecialSettings(src: any, dst: any): void;

    /**
     * Set the value of setting 'showLegend'
     * This depends on the value of the style fields, so it must be called
     * after the style field has been initialized.
     * @param {boolean} showLegend
     * @param {object} dst
     */
    export function setShowLegend(showLegend: boolean, dst: any): void;

    /**
     * Retrieve the style index from given styleName
     * @param {string} styleName  Style name such as 'dot', 'grid', 'dot-line'
     * @return {number} styleNumber Enumeration value representing the style, or -1
     *                when not found
     */
    export function getStyleNumberByName(styleName: string): number;

    /**
     * Check if given number is a valid style number.
     * @param {string | number} style
     * @return {boolean} true if valid, false otherwise
     */
    export function checkStyleNumber(style: string | number): boolean;

    /**
     * @param {string | number} style
     * @param {Object} dst
     */
    export function setStyle(style: string | number, dst: any): void;

    /**
     * Set the background styling for the graph
     * @param {string | {fill: string, stroke: string, strokeWidth: string}} backgroundColor
     * @param {Object} dst
     */
    export function setBackgroundColor(backgroundColor: string | any, dst: any): void;

    /**
     * @param {string | Object} dataColor
     * @param {Object} dst
     */
    export function setDataColor(dataColor: string | any, dst: any): void;

    /**
     * @param {Object} cameraPosition
     * @param {Object} dst
     */
    export function setCameraPosition(cameraPosition: any, dst: any): void;

    /**
     * An html slider control with start/stop/prev/next buttons
     * @constructor Slider
     * @param {Element} container  The element where the slider will be created
     * @param {Object} options   Available options:
     *                 {boolean} visible   If true (default) the
     *                           slider is visible.
     */
    export class Slider {
        constructor(container: any, options: any);

        /**
         * Select the previous index
         */
        prev(): void;

        /**
         * Select the next index
         */
        next(): void;

        /**
         * Select the next index
         */
        playNext(): void;

        /**
         * Toggle start or stop playing
         */
        togglePlay(): void;

        /**
         * Start playing
         */
        play(): void;

        /**
         * Stop playing
         */
        stop(): void;

        /**
         * Set a callback function which will be triggered when the value of the
         * slider bar has changed.
         * @param {function} callback
         */
        setOnChangeCallback(callback: any): void;

        /**
         * Set the interval for playing the list
         * @param {number} interval   The interval in milliseconds
         */
        setPlayInterval(interval: number): void;

        /**
         * Retrieve the current play interval
         * @return {number} interval   The interval in milliseconds
         */
        getPlayInterval(): number;

        /**
         * Set looping on or off
         * @param {boolean} doLoop  If true, the slider will jump to the start when
         *               the end is passed, and will jump to the end
         *               when the start is passed.
         */
        setPlayLoop(doLoop: boolean): void;

        /**
         * Execute the onchange callback function
         */
        onChange(): void;

        /**
         * redraw the slider on the correct place
         */
        redraw(): void;

        /**
         * Set the list with values for the slider
         * @param {Array} values   A javascript array with values (any type)
         */
        setValues(values: any): void;

        /**
         * Select a value by its index
         * @param {number} index
         */
        setIndex(index: number): void;

        /**
         * retrieve the index of the currently selected vaue
         * @return {number} index
         */
        getIndex(): number;

        /**
         * retrieve the currently selected value
         * @return {*} value
         */
        get(): any;

    }

    /**
     * @prototype StepNumber
     * The class StepNumber is an iterator for Numbers. You provide a start and end
     * value, and a best step size. StepNumber itself rounds to fixed values and
     * a finds the step that best fits the provided step.
     * If prettyStep is true, the step size is chosen as close as possible to the
     * provided step, but being a round value like 1, 2, 5, 10, 20, 50, ....
     * Example usage:
     *   var step = new StepNumber(0, 10, 2.5, true);
     *   step.start();
     *   while (!step.end()) {
     *   alert(step.getCurrent());
     *   step.next();
     *   }
     * Version: 1.0
     * @param {number} start     The start value
     * @param {number} end     The end value
     * @param {number} step    Optional. Step size. Must be a positive value.
     * @param {boolean} prettyStep Optional. If true, the step size is rounded
     *               To a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
     */
    export function StepNumber(start: number, end: number, step: number, prettyStep: boolean): void;

    /**
     * Register a touch event, taking place before a gesture
     * @callback callback           Called with events
     * @param {Hammer} hammer       A hammer instance
     * @param {function} callback   Callback, called as callback(event)
     */
    export type callback = (hammer: any, callback: any) => void;

    /**
     * Register a release event, taking place after a gesture
     * @param {Hammer} hammer       A hammer instance
     * @param {function} callback   Callback, called as callback(event)
     * @returns {function}
     */
    export function onRelease(hammer: any, callback: any): any;

    /**
     * Unregister a touch event, taking place before a gesture
     * @param {Hammer} hammer       A hammer instance
     * @param {function} callback   Callback, called as callback(event)
     */
    export function offTouch(hammer: any, callback: any): void;

    /**
     * Hack the PinchRecognizer such that it doesn't prevent default behavior
     * for vertical panning.
     * Yeah ... this is quite a hack ... see https://github.com/hammerjs/hammer.js/issues/932
     * @param {Hammer.Pinch} pinchRecognizer
     * @return {Hammer.Pinch} returns the pinchRecognizer
     */
    export function disablePreventDefaultVertically(pinchRecognizer: any): any;

    /**
     * Setup a mock hammer.js object, for unit testing.
     * Inspiration: https://github.com/uber/deck.gl/pull/658
     * @returns {{on: noop, off: noop, destroy: noop, emit: noop, get: get}}
     */
    export function hammerMock(): any;

    /**
     * Associates a canvas to a given image, containing a number of renderings
     * of the image at various sizes.
     * This technique is known as 'mipmapping'.
     * NOTE: Images can also be of type 'data:svg+xml`. This code also works
     *       for svg, but the mipmapping may not be necessary.
     * @param {Image} image
     */
    export class CachedImage {
        constructor(image: Image);

        /**
         * Called when the image has been successfully loaded.
         */
        init(): void;

        /**
         * @return {Boolean} true if init() has been called, false otherwise.
         */
        initialized(): any;

        /**
         * Draw the image, using the mipmap if necessary.
         * MipMap is only used if param factor > 2; otherwise, original bitmap
         * is resized. This is also used to skip mipmap usage, e.g. by setting factor = 1
         * Credits to 'Alex de Mulder' for original implementation.
         * @param {CanvasRenderingContext2D} ctx  context on which to draw zoomed image
         * @param {Float} factor scale factor at which to draw
         * @param {number} left
         * @param {number} top
         * @param {number} width
         * @param {number} height
         */
        drawImageAtPosition(ctx: any, factor: any, left: number, top: number, width: number, height: number): void;

    }

    /**
     * This class loads images and keeps them stored.
     * @param {function} callback
     */
    export class Images {
        constructor(callback: any);

        /**
         * @param {string} url                      The original Url that failed to load, if the broken image is successfully loaded it will be added to the cache using this Url as the key so that subsequent requests for this Url will return the broken image
         * @param {string} brokenUrl                Url the broken image to try and load
         * @param {Image} imageToLoadBrokenUrlOn   The image object
         */
        _tryloadBrokenUrl(url: string, brokenUrl: string, imageToLoadBrokenUrlOn: Image): void;

        /**
         * @param {string} url          Url of the image
         * @param {string} brokenUrl    Url of an image to use if the url image is not found
         * @return {Image} img          The image object
         */
        load(url: string, brokenUrl: string): Image;

    }

    /**
     * Create a network visualization, displaying nodes and edges.
     * @param {Element} container   The DOM element in which the Network will
     *                                  be created. Normally a div element.
     * @param {Object} data         An object containing parameters
     *                              {Array} nodes
     *                              {Array} edges
     * @param {Object} options      Options
     * @constructor Network
     */
    export class Network {
        constructor(container: any, data: any, options: any);

        /**
         * Set options
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Bind all events
         */
        bindEventListeners(): void;

        /**
         * Set nodes and edges, and optionally options as well.
         * @param {Object} data              Object containing parameters:
         *                                   {Array | DataSet | DataView} [nodes] Array with nodes
         *                                   {Array | DataSet | DataView} [edges] Array with edges
         *                                   {String} [dot] String containing data in DOT format
         *                                   {String} [gephi] String containing data in gephi JSON format
         *                                   {Options} [options] Object with options
         */
        setData(data: any): void;

        /**
         * Cleans up all bindings of the network, removing it fully from the memory IF the variable is set to null after calling this function.
         * var network = new vis.Network(..);
         * network.destroy();
         * network = null;
         */
        destroy(): void;

        /**
         * Returns true when the Network is active.
         * @returns {boolean}
         */
        isActive(): boolean;

        /**
         * Set an event listener.
         * Depending on the type of event you get different parameters for the callback function.
         * 
         * @param {string} eventName the name of the event, f.e. 'click'
         * @param {(params?: any) => void} callback the callback function that will be raised
         * 
         * @memberOf Network
         */
        on(eventName: any, callback: (params?: any) => void): void;

            /**
     * The joinCondition function is presented with all nodes.
     * 
     * @param {any} [options]
     * 
     * @memberOf Network
     */
    public cluster(options?: any): void;

    /**
     * 	This method looks at the provided node and makes a cluster of it and all it's connected nodes.
     * The behaviour can be customized by proving the options object.
     * All options of this object are explained below.
     * The joinCondition is only presented with the connected nodes.
     * 
     * @param {string} nodeId the id of the node
     * @param {any} [options] the cluster options
     * 
     * @memberOf Network
     */
    public clusterByConnection(nodeId: string, options?: any): void;

    /**
     * This method checks all nodes in the network and those with a equal or higher
     * amount of edges than specified with the hubsize qualify.
     * If a hubsize is not defined, the hubsize will be determined as the average
     * value plus two standard deviations. 
     * For all qualifying nodes, clusterByConnection is performed on each of them.
     * The options object is described for clusterByConnection and does the same here.
     * 
     * @param {number} [hubsize] optional hubsize
     * @param {any} [options] optional cluster options
     * 
     * @memberOf Network
     */
    public clusterByHubsize(hubsize?: number, options?: any): void;

    /**
     * This method will cluster all nodes with 1 edge with their respective connected node.
     * 
     * @param {any} [options] optional cluster options
     * 
     * @memberOf Network
     */
    public clusterOutliers(options?: any): void;

    /**
     * Nodes can be in clusters.
     * Clusters can also be in clusters.
     * This function returns an array of nodeIds showing where the node is. 
     *
     * Example:
     * cluster 'A' contains cluster 'B', cluster 'B' contains cluster 'C',
     * cluster 'C' contains node 'fred'.
     * 
     * network.clustering.findNode('fred') will return ['A','B','C','fred'].
     * 
     * @param {any} nodeId the node id.
     * @returns {any[]} an array of nodeIds showing where the node is
     * 
     * @memberOf Network
     */
    public findNode(nodeId: any): any[];

    /**
     * Similar to findNode in that it returns all the edge ids that were
     * created from the provided edge during clustering.
     * 
     * @param {any} baseEdgeId the base edge id
     * @returns {any[]} an array of edgeIds
     */
    public getClusteredEdges(baseEdgeId: any): any[];

    /**
     * When a clusteredEdgeId is available, this method will return the original
     * baseEdgeId provided in data.edges ie.
     * After clustering the 'SelectEdge' event is fired but provides only the clustered edge.
     * This method can then be used to return the baseEdgeId.
     * 
     * @param {any} clusteredEdgeId 
     * @returns {any} 
     */
    public getBaseEdge(clusteredEdgeId: any): any;

    /**
     * Visible edges between clustered nodes are not the same edge as the ones provided
     * in data.edges passed on network creation. With each layer of clustering, copies of
     * the edges between clusters are created and the previous edges are hidden,
     * until the cluster is opened. This method takes an edgeId (ie. a base edgeId from data.edges)
     * and applys the options to it and any edges that were created from it while clustering.
     * 
     * @param {IdType} startEdgeId
     * @param {any} [options]
     */
    public updateEdge(startEdgeId: any, options?: any): void;

    /**
     * Clustered Nodes when created are not contained in the original data.nodes 
     * passed on network creation. This method updates the cluster node.
     */
    public updateClusteredNode(clusteredNodeId: any, options?: any): void;

    /**
     * Returns true if the node whose ID has been supplied is a cluster.
     * 
     * @param {IdType} nodeId the node id.
     * @returns {boolean}
     * 
     * @memberOf Network
     */
    public isCluster(nodeId: any): boolean;

    /**
     * Returns an array of all nodeIds of the nodes that
     * would be released if you open the cluster.
     * 
     * @param {any} clusterNodeId the id of the cluster node
     * @returns {any[]}
     * 
     * @memberOf Network
     */
    public getNodesInCluster(clusterNodeId: any): any[];

    /**
     * Opens the cluster, releases the contained nodes and edges,
     * removing the cluster node and cluster edges.
     * The options object is optional and currently supports one option,
     * releaseFunction, which is a function that can be used to manually
     * position the nodes after the cluster is opened. 
     * 
     * @param {any} nodeId the node id
     * @param {any} [options] optional open cluster options
     * 
     * @memberOf Network
     */
    public openCluster(nodeId: any, options?: any): void;

    }
    /**
     * Utility Class
     */
    export class NetworkUtil {
        constructor();

        /**
         * Find the center position of the network considering the bounding boxes
         * @param {Array.<Node>} allNodes
         * @param {Array.<Node>} [specificNodes=[]]
         * @returns {{minX: number, maxX: number, minY: number, maxY: number}}
         * @static
         */
        static getRange(allNodes: (Node)[], specificNodes?: (Node)[]): any;

        /**
         * Find the center position of the network
         * @param {Array.<Node>} allNodes
         * @param {Array.<Node>} [specificNodes=[]]
         * @returns {{minX: number, maxX: number, minY: number, maxY: number}}
         * @static
         */
        static getRangeCore(allNodes: (Node)[], specificNodes?: (Node)[]): any;

        /**
         * @param {object} range = {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
         * @returns {{x: number, y: number}}
         * @static
         */
        static findCenter(range: any): any;

        /**
         * This returns a clone of the options or options of the edge or node to be used for construction of new edges or check functions for new nodes.
         * @param {Item} item
         * @param {'node'|undefined} type
         * @returns {{}}
         * @static
         */
        static cloneOptions(item: Item, type: any | any): any;

    }

    /**
     * Parse a text source containing data in DOT language into a JSON object.
     * The object contains two lists: one with nodes and one with edges.
     * DOT language reference: http://www.graphviz.org/doc/info/lang.html
     * DOT language attributes: http://graphviz.org/content/attrs
     * @param {string} data     Text containing a graph in DOT-notation
     * @return {Object} graph   An object containing two parameters:
     *                          {Object[]} nodes
     *                          {Object[]} edges
     * -------------------------------------------
     * TODO
     * ====
     * For label handling, this is an incomplete implementation. From docs (quote #3015):
     * > the escape sequences "\n", "\l" and "\r" divide the label into lines, centered,
     * > left-justified, and right-justified, respectively.
     * Source: http://www.graphviz.org/content/attrs#kescString
     * > As another aid for readability, dot allows double-quoted strings to span multiple physical
     * > lines using the standard C convention of a backslash immediately preceding a newline
     * > character
     * > In addition, double-quoted strings can be concatenated using a '+' operator.
     * > As HTML strings can contain newline characters, which are used solely for formatting,
     * > the language does not allow escaped newlines or concatenation operators to be used
     * > within them.
     * - Currently, only '\\n' is handled
     * - Note that text explicitly says 'labels'; the dot parser currently handles escape
     *   sequences in **all** strings.
     */
    export function parseDOT(data: string): any;

    /**
     * Get the first character from the dot file.
     * The character is stored into the char c. If the end of the dot file is
     * reached, the function puts an empty string in c.
     */
    export function first(): void;

    /**
     * Get the next character from the dot file.
     * The character is stored into the char c. If the end of the dot file is
     * reached, the function puts an empty string in c.
     */
    export function next(): void;

    /**
     * Preview the next character from the dot file.
     * @return {string} cNext
     */
    export function nextPreview(): string;

    /**
     * Test whether given character is alphabetic or numeric
     * @param {string} c
     * @return {Boolean} isAlphaNumeric
     */
    export function isAlphaNumeric(c: string): any;

    /**
     * Merge all options of object b into object b
     * @param {Object} a
     * @param {Object} b
     * @return {Object} a
     */
    export function merge(a: any, b: any): any;

    /**
     * Set a value in an object, where the provided parameter name can be a
     * path with nested parameters. For example:
     *     var obj = {a: 2};
     *     setValue(obj, 'b.c', 3);     // obj = {a: 2, b: {c: 3}}
     * @param {Object} obj
     * @param {string} path  A parameter name or dot-separated parameter path,
     *                      like "color.highlight.border".
     * @param {*} value
     */
    export function setValue(obj: any, path: string, value: any): void;

    /**
     * Add a node to a graph object. If there is already a node with
     * the same id, their attributes will be merged.
     * @param {Object} graph
     * @param {Object} node
     */
    export function addNode(graph: any, node: any): void;

    /**
     * Add an edge to a graph object
     * @param {Object} graph
     * @param {Object} edge
     */
    export function addEdge(graph: any, edge: any): void;

    /**
     * Create an edge to a graph object
     * @param {Object} graph
     * @param {string | number | Object} from
     * @param {string | number | Object} to
     * @param {string} type
     * @param {Object | null} attr
     * @return {Object} edge
     */
    export function createEdge(graph: any, from: string | number | any, to: string | number | any, type: string, attr: any | any): any;

    /**
     * Get next token in the current dot file.
     * The token and token type are available as token and tokenType
     */
    export function getToken(): void;

    /**
     * Parse a graph.
     * @returns {Object} graph
     */
    export function parseGraph(): any;

    /**
     * Parse a list with statements.
     * @param {Object} graph
     */
    export function parseStatements(graph: any): void;

    /**
     * Parse a single statement. Can be a an attribute statement, node
     * statement, a series of node statements and edge statements, or a
     * parameter.
     * @param {Object} graph
     */
    export function parseStatement(graph: any): void;

    /**
     * Parse a subgraph
     * @param {Object} graph    parent graph object
     * @return {Object | null} subgraph
     */
    export function parseSubgraph(graph: any): any | any;

    /**
     * parse an attribute statement like "node [shape=circle fontSize=16]".
     * Available keywords are 'node', 'edge', 'graph'.
     * The previous list with default attributes will be replaced
     * @param {Object} graph
     * @returns {string | null} keyword Returns the name of the parsed attribute
     *                                  (node, edge, graph), or null if nothing
     *                                  is parsed.
     */
    export function parseAttributeStatement(graph: any): string | any;

    /**
     * parse a node statement
     * @param {Object} graph
     * @param {string | number} id
     */
    export function parseNodeStatement(graph: any, id: string | number): void;

    /**
     * Parse an edge or a series of edges
     * @param {Object} graph
     * @param {string | number} from        Id of the from node
     */
    export function parseEdge(graph: any, from: string | number): void;

    /**
     * Parse a set with attributes,
     * for example [label="1.000", shape=solid]
     * @return {Object | null} attr
     */
    export function parseAttributeList(): any | any;

    /**
     * Create a syntax error with extra information on current token and index.
     * @param {string} message
     * @returns {SyntaxError} err
     */
    export function newSyntaxError(message: string): any;

    /**
     * Chop off text after a maximum length
     * @param {string} text
     * @param {number} maxLength
     * @returns {string}
     */
    export function chop(text: string, maxLength: number): string;

    /**
     * Execute a function fn for each pair of elements in two arrays
     * @param {Array | *} array1
     * @param {Array | *} array2
     * @param {function} fn
     */
    export function forEach2(array1: any | any, array2: any | any, fn: any): void;

    /**
     * Set a nested property on an object
     * When nested objects are missing, they will be created.
     * For example setProp({}, 'font.color', 'red') will return {font: {color: 'red'}}
     * @param {Object} object
     * @param {string} path   A dot separated string like 'font.color'
     * @param {*} value       Value for the property
     * @return {Object} Returns the original object, allows for chaining.
     */
    export function setProp(object: any, path: string, value: any): any;

    /**
     * Convert an object with DOT attributes to their vis.js equivalents.
     * @param {Object} attr     Object with DOT attributes
     * @param {Object} mapping
     * @return {Object}         Returns an object with vis.js attributes
     */
    export function convertAttr(attr: any, mapping: any): any;

    /**
     * Convert a string containing a graph in DOT language into a map containing
     * with nodes and edges in the format of graph.
     * @param {string} data         Text containing a graph in DOT-notation
     * @return {Object} graphData
     */
    export function DOTToGraph(data: string): any;

    /**
     * @param {json} gephiJSON
     * @param {obj} optionsObj
     * @returns {{nodes: Array, edges: Array}}
     */
    export function parseGephi(gephiJSON: any, optionsObj: any): any;

    /**
     * Create the main frame for the Network.
     * This function is executed once when a Network object is created. The frame
     * contains a canvas, and this canvas contains all objects like the axis and
     * nodes.
     * @param {Object} body
     */
    export class Canvas {
        constructor(body: any);

        /**
         * Binds event listeners
         */
        bindEventListeners(): void;

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Create the HTML
         */
        _create(): void;

        /**
         * Set a new size for the network
         * @param {string} width   Width in pixels or percentage (for example '800px'
         *                         or '50%')
         * @param {string} height  Height in pixels or percentage  (for example '400px'
         *                         or '30%')
         * @returns {boolean}
         */
        setSize(width: string, height: string): boolean;

        /**
         * @returns {CanvasRenderingContext2D}
         */
        getContext(): any;

        /**
         * Set the transform in the contained context, based on its pixelRatio
         */
        setTransform(): void;

        /**
         * @param {object} pos   = {x: number, y: number}
         * @returns {{x: number, y: number}}
         */
        canvasToDOM(pos: any): any;

        /**
         * @param {object} pos   = {x: number, y: number}
         * @returns {{x: number, y: number}}
         */
        DOMtoCanvas(pos: any): any;

    }

    /**
     * @param {Object} body
     * @param {Canvas} canvas
     */
    export class CanvasRenderer {
        constructor(body: any, canvas: Canvas);

        /**
         * Binds event listeners
         */
        bindEventListeners(): void;

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Redraw the network with the current data
         * chart will be resized too.
         */
        redraw(): void;

    }

    /**
     * @param {Object} body
     */
    export class ClusterEngine {
        constructor(body: any);

        /**
         * @param {number} hubsize
         * @param {Object} options
         */
        clusterByHubsize(hubsize: number, options: any): void;

        /**
         * loop over all nodes, check if they adhere to the condition and cluster if needed.
         * @param {Object} options
         * @param {boolean} [refreshData=true]
         */
        cluster(options: any, refreshData?: boolean): void;

        /**
         * Cluster all nodes in the network that have only X edges
         * @param {number} edgeCount
         * @param {Object} options
         * @param {boolean} [refreshData=true]
         */
        clusterByEdgeCount(edgeCount: number, options: any, refreshData?: boolean): void;

        /**
         * Cluster all nodes in the network that have only 1 edge
         * @param {Object} options
         * @param {boolean} [refreshData=true]
         */
        clusterOutliers(options: any, refreshData?: boolean): void;

        /**
         * Cluster all nodes in the network that have only 2 edge
         * @param {Object} options
         * @param {boolean} [refreshData=true]
         */
        clusterBridges(options: any, refreshData?: boolean): void;

        /**
         * suck all connected nodes of a node into the node.
         * @param {Node.id} nodeId
         * @param {Object} options
         * @param {boolean} [refreshData=true]
         */
        clusterByConnection(nodeId: any, options: any, refreshData?: boolean): void;

        /**
         * Check if a node is a cluster.
         * @param {Node.id} nodeId
         * @returns {*}
         */
        isCluster(nodeId: any): any;

        /**
         * Open a cluster by calling this function.
         * @param {Edge.id}  clusterNodeId | the ID of the cluster node
         * @param {Object} options
         * @param {boolean} refreshData | wrap up afterwards if not true
         */
        openCluster(clusterNodeId: any, options: any, refreshData?: boolean): void;

        /**
         * @param {Cluster.id} clusterId
         * @returns {Array.<Node.id>}
         */
        getNodesInCluster(clusterId: any): any[];

        /**
         * Get the stack clusterId's that a certain node resides in. cluster A -> cluster B -> cluster C -> node
         * If a node can't be found in the chain, return an empty array.
         * @param {string|number} nodeId
         * @returns {Array}
         */
        findNode(nodeId: string | number): any;

        /**
         * Using a clustered nodeId, update with the new options
         * @param {Edge.id} clusteredNodeId
         * @param {object} newOptions
         */
        updateClusteredNode(clusteredNodeId: any, newOptions: any): void;

        /**
         * Using a base edgeId, update all related clustered edges with the new options
         * @param {Edge.id} startEdgeId
         * @param {object} newOptions
         */
        updateEdge(startEdgeId: any, newOptions: any): void;

        /**
         * Get a stack of clusterEdgeId's (+base edgeid) that a base edge is the same as. cluster edge C -> cluster edge B -> cluster edge A -> base edge(edgeId)
         * @param {Edge.id} edgeId
         * @returns {Array.<Edge.id>}
         */
        getClusteredEdges(edgeId: any): any[];

        /**
         * Get the base edge id of clusterEdgeId. cluster edge (clusteredEdgeId) -> cluster edge B -> cluster edge C -> base edge
         * @param {Edge.id} clusteredEdgeId
         * @returns {Edge.id} baseEdgeId
         * TODO: deprecate in 5.0.0. Method getBaseEdges() is the correct one to use.
         */
        getBaseEdge(clusteredEdgeId: any): any;

        /**
         * Get all regular edges for this clustered edge id.
         * @param {Edge.id} clusteredEdgeId
         * @returns {Array.<Edge.id>} all baseEdgeId's under this clustered edge
         */
        getBaseEdges(clusteredEdgeId: any): any[];

        /**
         * Scan all edges for changes in clustering and adjust this if necessary.
         * Call this (internally) after there has been a change in node or edge data.
         */
        _updateState(): void;

        /**
         * Determine if node with given id is part of a cluster.
         * @param {Node.id} nodeId
         * @return {boolean} true if part of a cluster.
         */
        _isClusteredNode(nodeId: any): boolean;

        /**
         * Determine if edge with given id is not visible due to clustering.
         * An edge is considered clustered if:
         * - it is directly replaced by a clustering edge
         * - any of its connecting nodes is in a cluster
         * @param {Edge.id} edgeId
         * @return {boolean} true if part of a cluster.
         */
        _isClusteredEdge(edgeId: any): boolean;

    }

    /**
     * @param {Object} body
     * @param {Array.<Image>} images
     * @param {Array.<Group>} groups
     */
    export class EdgesHandler {
        constructor(body: any, images: (Image)[], groups: (Group)[]);

        /**
         * Binds event listeners
         */
        bindEventListeners(): void;

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Refreshes Edge Handler
         */
        refresh(): void;

        /**
         * @param {Object} properties
         * @returns {Edge}
         */
        create(properties: any): Edge;

        /**
         * @param {Edge.id} edgeId
         * @returns {Array}
         */
        getConnectedNodes(edgeId: any): any;

        /**
         * Scan for missing nodes and remove corresponding edges, if any.
         * There is no direct relation between the nodes and the edges DataSet,
         * so the right place to do call this is in the handler for event `_dataUpdated`.
         */
        _updateState(): void;

    }

    /**
     * This class can store groups and options specific for groups.
     */
    export class Groups {
        constructor();

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Clear all groups
         */
        clear(): void;

        /**
         * get group options of a groupname. If groupname is not found, a new group
         * is added.
         * @param {*} groupname        Can be a number, string, Date, etc.
         * @return {Object} group      The created group, containing all group options
         */
        get(groupname: any): any;

        /**
         * Add a custom group style
         * @param {string} groupName
         * @param {Object} style       An object containing borderColor,
         *                             backgroundColor, etc.
         * @return {Object} group      The created group object
         */
        add(groupName: string, style: any): any;

    }

    /**
     * @param {Object} body
     * @param {Canvas} canvas
     * @param {SelectionHandler} selectionHandler
     */
    export class InteractionHandler {
        constructor(body: any, canvas: Canvas, selectionHandler: SelectionHandler);

        /**
         * Binds event listeners
         */
        bindEventListeners(): void;

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * @param {Event} event
         */
        onContext(event: any): void;

        /**
         * Select and deselect nodes depending current selection change.
         * For changing nodes, select/deselect events are fired.
         * NOTE: For a given edge, if one connecting node is deselected and with the same
         *       click the other node is selected, no events for the edge will fire.
         *       It was selected and it will remain selected.
         * TODO: This is all SelectionHandler calls; the method should be moved to there.
         * @param {{x: number, y: number}} pointer
         * @param {Event} event
         * @param {boolean} [add=false]
         */
        checkSelectionChanges(pointer: any, event: any, add?: boolean): void;

    }

    /**
     * KamadaKawai positions the nodes initially based on
     * "AN ALGORITHM FOR DRAWING GENERAL UNDIRECTED GRAPHS"
     * -- Tomihisa KAMADA and Satoru KAWAI in 1989
     * Possible optimizations in the distance calculation can be implemented.
     * @param {Object} body
     * @param {number} edgeLength
     * @param {number} edgeStrength
     */
    export class KamadaKawai {
        constructor(body: any, edgeLength: number, edgeStrength: number);

        /**
         * Not sure if needed but can be used to update the spring length and spring constant
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Position the system
         * @param {Array.<Node>} nodesArray
         * @param {Array.<Edge>} edgesArray
         * @param {boolean} [ignoreClusters=false]
         */
        solve(nodesArray: (Node)[], edgesArray: (Edge)[], ignoreClusters?: boolean): void;

    }

    /**
     * @param {Object} body
     */
    export class LayoutEngine {
        constructor(body: any);

        /**
         * Binds event listeners
         */
        bindEventListeners(): void;

        /**
         * @param {Object} options
         * @param {Object} allOptions
         * @returns {Object}
         */
        setOptions(options: any, allOptions: any): any;

        /**
         * @param {Object} allOptions
         * @returns {Object}
         */
        adaptAllOptionsForHierarchicalLayout(allOptions: any): any;

        /**
         * @returns {number}
         */
        seededRandom(): number;

        /**
         * @param {Array.<Node>} nodesArray
         */
        positionInitially(nodesArray: (Node)[]): void;

        /**
         * Use Kamada Kawai to position nodes. This is quite a heavy algorithm so if there are a lot of nodes we
         * cluster them first to reduce the amount.
         */
        layoutNetwork(): void;

        /**
         * @returns {number|*}
         */
        getSeed(): number | any;

        /**
         * Receives an array with node indices and returns an array with the actual node references.
         * Used for sorting based on node properties.
         * @param {Array.<Node.id>} idArray
         * @returns {Array.<Node>}
         */
        _indexArrayToNodes(idArray: any[]): (Node)[];

        /**
         * Get the type of static smooth curve in case it is required.
         * The return value is the type to use to translate dynamic curves to
         * another type, in the case of hierarchical layout. Dynamic curves do
         * not work for that layout type.
         * @returns {'horizontal'|'vertical'}
         */
        getStaticType(): any | any;

    }

    /**
     * @param {Object} body
     * @param {Images} images
     * @param {Array.<Group>} groups
     * @param {LayoutEngine} layoutEngine
     */
    export class NodesHandler {
        constructor(body: any, images: Images, groups: (Group)[], layoutEngine: LayoutEngine);

        /**
         * Binds event listeners
         */
        bindEventListeners(): void;

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * create a node
         * @param {Object} properties
         * @param {class} [constructorClass=Node.default]
         * @returns {*}
         */
        create(properties: any, constructorClass?: any): any;

        /**
         * @param {boolean} [clearPositions=false]
         */
        refresh(clearPositions?: boolean): void;

        /**
         * Returns the positions of the nodes.
         * @param {Array.<Node.id>|String} [ids]  --> optional, can be array of nodeIds, can be string
         * @returns {{}}
         */
        getPositions(ids?: any[] | any): any;

        /**
         * Load the XY positions of the nodes into the dataset.
         */
        storePositions(): void;

        /**
         * get the bounding box of a node.
         * @param {Node.id} nodeId
         * @returns {j|*}
         */
        getBoundingBox(nodeId: any): any | any;

        /**
         * Get the Ids of nodes connected to this node.
         * @param {Node.id} nodeId
         * @param {'to'|'from'|undefined} direction values 'from' and 'to' select respectively parent and child nodes only.
         *                                          Any other value returns both parent and child nodes.
         * @returns {Array}
         */
        getConnectedNodes(nodeId: any, direction: any | any | any): any;

        /**
         * Get the ids of the edges connected to this node.
         * @param {Node.id} nodeId
         * @returns {*}
         */
        getConnectedEdges(nodeId: any): any;

        /**
         * Move a node.
         * @param {Node.id} nodeId
         * @param {number} x
         * @param {number} y
         */
        moveNode(nodeId: any, x: number, y: number): void;

    }

    /**
     * @param {Object} body
     */
    export class PhysicsEngine {
        constructor(body: any);

        /**
         * Binds event listeners
         */
        bindEventListeners(): void;

        /**
         * set the physics options
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * configure the engine.
         */
        init(): void;

        /**
         * initialize the engine
         */
        initPhysics(): void;

        /**
         * Start the simulation
         */
        startSimulation(): void;

        /**
         * Stop the simulation, force stabilization.
         * @param {boolean} [emit=true]
         */
        stopSimulation(emit?: boolean): void;

        /**
         * The viewFunction inserts this step into each render loop. It calls the physics tick and handles the cleanup at stabilized.
         */
        simulationStep(): void;

        /**
         * Revert the simulation one step. This is done so after stabilization, every new start of the simulation will also say stabilized.
         */
        revert(): void;

        /**
         * move the nodes one timestep and check if they are stabilized
         */
        moveNodes(): void;

        /**
         * calculate the forces for one physics iteration.
         */
        calculateForces(): void;

        /**
         * Find a stable position for all nodes
         * @param {number} [iterations=this.options.stabilization.iterations]
         */
        stabilize(iterations?: number): void;

    }

    /**
     * @param {Object} body
     * @param {Canvas} canvas
     */
    export class SelectionHandler {
        constructor(body: any, canvas: Canvas);

        /**
         * @param {Object} [options]
         */
        setOptions(options?: any): void;

        /**
         * handles the selection part of the tap;
         * @param {{x: number, y: number}} pointer
         * @returns {boolean}
         */
        selectOnPoint(pointer: any): boolean;

        /**
         * @param {{x: number, y: number}} pointer
         * @returns {boolean}
         */
        selectAdditionalOnPoint(pointer: any): boolean;

        /**
         * Generate an event which the user can catch.
         * This adds some extra data to the event with respect to cursor position and
         * selected nodes and edges.
         * @param {string} eventType                          Name of event to send
         * @param {Event}  event
         * @param {{x: number, y: number}} pointer            Object with the x and y screen coordinates of the mouse
         * @param {Object|undefined} oldSelection             If present, selection state before event occured
         * @param {boolean|undefined} [emptySelection=false]  Indicate if selection data should be passed
         */
        _generateClickEvent(eventType: string, event: any, pointer: any, oldSelection: any | any, emptySelection?: boolean | any): void;

        /**
         * @param {Object} obj
         * @param {boolean} [highlightEdges=this.options.selectConnectedEdges]
         * @returns {boolean}
         */
        selectObject(obj: any, highlightEdges?: boolean): boolean;

        /**
         * @param {Object} obj
         */
        deselectObject(obj: any): void;

        /**
         * Get the top node at the passed point (like a click)
         * @param {{x: number, y: number}} pointer
         * @param {boolean} [returnNode=true]
         * @return {Node | undefined} node
         */
        getNodeAt(pointer: any, returnNode?: boolean): Node | any;

        /**
         * Get the edges nearest to the passed point (like a click)
         * @param {{x: number, y: number}} pointer
         * @param {boolean} [returnEdge=true]
         * @return {Edge | undefined} node
         */
        getEdgeAt(pointer: any, returnEdge?: boolean): Edge | any;

        /**
         * Unselect all. The selectionObj is useful for this.
         */
        unselectAll(): void;

        /**
         * Perform actions in response to a mouse movement.
         * @param {Event}  event
         * @param {{x: number, y: number}} pointer | object with the x and y screen coordinates of the mouse
         */
        hoverObject(event: any, pointer: any): void;

        /**
         * retrieve the currently selected objects
         * @return {{nodes: Array.<string>, edges: Array.<string>}} selection
         */
        getSelection(): any;

        /**
         * retrieve the currently selected nodes
         * @return {string[]} selection    An array with the ids of the
         *                                            selected nodes.
         */
        getSelectedNodes(): string[];

        /**
         * retrieve the currently selected edges
         * @return {Array} selection    An array with the ids of the
         *                                            selected nodes.
         */
        getSelectedEdges(): any;

        /**
         * Updates the current selection
         * @param {{nodes: Array.<string>, edges: Array.<string>}} selection
         * @param {Object} options                                 Options
         */
        setSelection(selection: any, options: any): void;

        /**
         * select zero or more nodes with the option to highlight edges
         * @param {number[] | string[]} selection     An array with the ids of the
         *                                            selected nodes.
         * @param {boolean} [highlightEdges]
         */
        selectNodes(selection: number[] | string[], highlightEdges?: boolean): void;

        /**
         * select zero or more edges
         * @param {number[] | string[]} selection     An array with the ids of the
         *                                            selected nodes.
         */
        selectEdges(selection: number[] | string[]): void;

    }

    /**
     * @param {Object} body
     * @param {Canvas} canvas
     */
    export class View {
        constructor(body: any, canvas: Canvas);

        /**
         * @param {Object} [options={}]
         */
        setOptions(options?: any): void;

        /**
         * This function zooms out to fit all data on screen based on amount of nodes
         * @param {Object} [options={{nodes=Array}}]
         * @param {boolean} [initialZoom=false]  | zoom based on fitted formula or range, true = fitted, default = false;
         */
        fit(options?: any, initialZoom?: boolean): void;

        /**
         * Center a node in view.
         * @param {number} nodeId
         * @param {number} [options]
         */
        focus(nodeId: number, options?: number): void;

        /**
         * @param {Object} options  |  options.offset   = {x:number, y:number}   // offset from the center in DOM pixels
         *                          |  options.scale    = number                 // scale to move to
         *                          |  options.position = {x:number, y:number}   // position to move to
         *                          |  options.animation = {duration:number, easingFunction:String} || Boolean   // position to move to
         */
        moveTo(options: any): void;

        /**
         * @param {Object} options  |  options.offset   = {x:number, y:number}   // offset from the center in DOM pixels
         *                          |  options.time     = number                 // animation time in milliseconds
         *                          |  options.scale    = number                 // scale to animate to
         *                          |  options.position = {x:number, y:number}   // position to animate to
         *                          |  options.easingFunction = String           // linear, easeInQuad, easeOutQuad, easeInOutQuad,
         *                                                                       // easeInCubic, easeOutCubic, easeInOutCubic,
         *                                                                       // easeInQuart, easeOutQuart, easeInOutQuart,
         *                                                                       // easeInQuint, easeOutQuint, easeInOutQuint
         */
        animateView(options: any): void;

        /**
         * Resets state of a locked on Node
         */
        releaseNode(): void;

        /**
         * @returns {number}
         */
        getScale(): number;

        /**
         * @returns {{x: number, y: number}}
         */
        getViewPosition(): any;

    }

    /**
     * An edge connects two nodes and has a specific direction.
     * @param {Object} options        values specific to this edge, must contain at least 'from' and 'to'
     * @param {Object} body           shared state from Network instance
     * @param {Object} globalOptions  options from the EdgesHandler instance
     * @param {Object} defaultOptions default options from the EdgeHandler instance. Value and reference are constant
     * @param {Object} edgeOptions    option values specific for edges.
     */
    export class Edge {
        constructor(options: any, body: any, globalOptions: any, defaultOptions: any, edgeOptions: any);

        /**
         * Set or overwrite options for the edge
         * @param {Object} options  an object with options
         * @returns {null|boolean} null if no options, boolean if date changed
         */
        setOptions(options: any): any | boolean;

        /**
         * @param {Object} parentOptions
         * @param {Object} newOptions
         * @param {boolean} [allowDeletion=false]
         * @param {Object} [globalOptions={}]
         * @param {boolean} [copyFromGlobals=false]
         */
        static parseOptions(parentOptions: any, newOptions: any, allowDeletion?: boolean, globalOptions?: any, copyFromGlobals?: boolean): void;

        /**
         * @returns {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}}
         */
        getFormattingValues(): any;

        /**
         * update the options in the label module
         * @param {Object} options
         */
        updateLabelModule(options: any): void;

        /**
         * update the edge type, set the options
         * @returns {boolean}
         */
        updateEdgeType(): boolean;

        /**
         * Connect an edge to its nodes
         */
        connect(): void;

        /**
         * Disconnect an edge from its nodes
         */
        disconnect(): void;

        /**
         * get the title of this edge.
         * @return {string} title    The title of the edge, or undefined when no title
         *                           has been set.
         */
        getTitle(): string;

        /**
         * check if this node is selecte
         * @return {boolean} selected   True if node is selected, else false
         */
        isSelected(): boolean;

        /**
         * Retrieve the value of the edge. Can be undefined
         * @return {number} value
         */
        getValue(): number;

        /**
         * Adjust the value range of the edge. The edge will adjust it's width
         * based on its value.
         * @param {number} min
         * @param {number} max
         * @param {number} total
         */
        setValueRange(min: number, max: number, total: number): void;

        /**
         * Redraw a edge
         * Draw this edge in the given canvas
         * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
         * @param {CanvasRenderingContext2D}   ctx
         */
        draw(ctx: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {Object} arrowData
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        drawArrows(ctx: any, arrowData: any, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {Node} viaNode
         */
        drawLabel(ctx: any, viaNode: Node): void;

        /**
         * Check if this object is overlapping with the provided object
         * @param {Object} obj   an object with parameters left, top
         * @return {boolean}     True if location is located on the edge
         */
        isOverlappingWith(obj: any): boolean;

        /**
         * Sets selected state to true
         */
        select(): void;

        /**
         * Sets selected state to false
         */
        unselect(): void;

        /**
         * cleans all required things on delete
         * @returns {*}
         */
        cleanup(): any;

        /**
         * Remove edge from the list and perform necessary cleanup.
         */
        remove(): void;

        /**
         * Check if both connecting nodes exist
         * @returns {boolean}
         */
        endPointsValid(): boolean;

    }

    /**
     * @param {Object} body
     * @param {Canvas} canvas
     */
    export class NavigationHandler {
        constructor(body: any, canvas: Canvas);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Creates or refreshes navigation and sets key bindings
         */
        create(): void;

        /**
         * Cleans up previous navigation items
         */
        cleanNavigation(): void;

        /**
         * @param {string} action
         */
        bindToRedraw(action: string): void;

        /**
         * @param {string} action
         */
        unbindFromRedraw(action: string): void;

        /**
         * bind all keys using keycharm.
         */
        configureKeyboardBindings(): void;

    }

    /**
     * A node. A node can be connected to other nodes via one or multiple edges.
     */
    export class Node {
        constructor(options: any, body: any, imagelist: any, grouplist: Groups, globalOptions: any, defaultOptions: any, nodeOptions: any);

        /**
         * Attach a edge to the node
         * @param {Edge} edge
         */
        attachEdge(edge: Edge): void;

        /**
         * Detach a edge from the node
         * @param {Edge} edge
         */
        detachEdge(edge: Edge): void;

        /**
         * Set or overwrite options for the node
         * @param {Object} options an object with options
         * @returns {null|boolean}
         */
        setOptions(options: any): any | boolean;

        /**
         * This process all possible shorthands in the new options and makes sure that the parentOptions are fully defined.
         * Static so it can also be used by the handler.
         * @param {Object} parentOptions
         * @param {Object} newOptions
         * @param {boolean} [allowDeletion=false]
         * @param {Object} [globalOptions={}]
         * @static
         */
        static parseOptions(parentOptions: any, newOptions: any, allowDeletion?: boolean, globalOptions?: any): void;

        /**
         * @returns {{color: *, borderWidth: *, borderColor: *, size: *, borderDashes: (boolean|Array|allOptions.nodes.shapeProperties.borderDashes|{boolean, array}), borderRadius: (number|allOptions.nodes.shapeProperties.borderRadius|{number}|Array), shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *}}
         */
        getFormattingValues(): any;

        /**
         * @param {Object} options
         */
        updateLabelModule(options: any): void;

        /**
         * @param {string} currentShape
         */
        updateShape(currentShape: string): void;

        /**
         * select this node
         */
        select(): void;

        /**
         * unselect this node
         */
        unselect(): void;

        /**
         * Reset the calculated size of the node, forces it to recalculate its size
         */
        needsRefresh(): void;

        /**
         * get the title of this node.
         * @return {string} title    The title of the node, or undefined when no title
         *                           has been set.
         */
        getTitle(): string;

        /**
         * Calculate the distance to the border of the Node
         * @param {CanvasRenderingContext2D}   ctx
         * @param {number} angle        Angle in radians
         * @returns {number} distance   Distance to the border in pixels
         */
        distanceToBorder(ctx: any, angle: number): number;

        /**
         * Check if this node has a fixed x and y position
         * @return {boolean}      true if fixed, false if not
         */
        isFixed(): boolean;

        /**
         * check if this node is selecte
         * @return {boolean} selected   True if node is selected, else false
         */
        isSelected(): boolean;

        /**
         * Retrieve the value of the node. Can be undefined
         * @return {number} value
         */
        getValue(): number;

        /**
         * Adjust the value range of the node. The node will adjust it's size
         * based on its value.
         * @param {number} min
         * @param {number} max
         * @param {number} total
         */
        setValueRange(min: number, max: number, total: number): void;

        /**
         * Draw this node in the given canvas
         * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
         * @param {CanvasRenderingContext2D}   ctx
         */
        draw(ctx: any): void;

        /**
         * Update the bounding box of the shape
         * @param {CanvasRenderingContext2D}   ctx
         */
        updateBoundingBox(ctx: any): void;

        /**
         * Recalculate the size of this node in the given canvas
         * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
         * @param {CanvasRenderingContext2D}   ctx
         */
        resize(ctx: any): void;

        /**
         * Check if this object is overlapping with the provided object
         * @param {Object} obj   an object with parameters left, top, right, bottom
         * @return {boolean}     True if location is located on node
         */
        isOverlappingWith(obj: any): boolean;

        /**
         * Check if this object is overlapping with the provided object
         * @param {Object} obj   an object with parameters left, top, right, bottom
         * @return {boolean}     True if location is located on node
         */
        isBoundingBoxOverlappingWith(obj: any): boolean;

        /**
         * Check valid values for mass
         * The mass may not be negative or zero. If it is, reset to 1
         * @param {object} options
         * @param {Node.id} id
         * @static
         */
        static checkMass(options: any, id: any): void;

    }

    /**
     *  The Floyd–Warshall algorithm is an algorithm for finding shortest paths in
     *  a weighted graph with positive or negative edge weights (but with no negative
     *  cycles). - https://en.wikipedia.org/wiki/Floyd–Warshall_algorithm
     */
    export class FloydWarshall {
        constructor();

        /**
         * @param {Object} body
         * @param {Array.<Node>} nodesArray
         * @param {Array.<Edge>} edgesArray
         * @returns {{}}
         */
        getDistances(body: any, nodesArray: (Node)[], edgesArray: (Edge)[]): any;

    }

    /**
     * A Dynamic Bezier Edge. Bezier curves are used to model smooth gradual
     * curves in paths between nodes. The Dynamic piece refers to how the curve
     * reacts to physics changes.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends BezierEdgeBase
     */
    export class BezierEdgeDynamic extends BezierEdgeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Connects an edge to node(s)
         */
        connect(): void;

        /**
         * remove the support nodes
         * @returns {boolean}
         */
        cleanup(): boolean;

        /**
         * Positions bezier node
         */
        positionBezierNode(): void;

        /**
         * @returns {Node|undefined|*|{index, line, column}}
         */
        getViaNode(): Node | any | any | any;

    }

    /**
     * A Static Bezier Edge. Bezier curves are used to model smooth gradual
     * curves in paths between nodes.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends BezierEdgeBase
     */
    export class BezierEdgeStatic extends BezierEdgeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @returns {Array.<{x: number, y: number}>}
         */
        getViaNode(): any[];

    }

    /**
     * A Cubic Bezier Edge. Bezier curves are used to model smooth gradual
     * curves in paths between nodes.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends CubicBezierEdgeBase
     */
    export class CubicBezierEdge extends CubicBezierEdgeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @returns {Array.<{x: number, y: number}>}
         */
        getViaNode(): any[];

    }

    /**
     * A Straight Edge.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends EdgeBase
     */
    export class StraightEdge extends EdgeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @returns {undefined}
         */
        getViaNode(): any;

    }

    /**
     * The Base Class for all Bezier edges. Bezier curves are used to model smooth
     * gradual curves in paths between nodes.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends EdgeBase
     */
    export class BezierEdgeBase extends EdgeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * Draw a bezier curve between two nodes
         * The method accepts zero, one or two control points.
         * Passing zero control points just draws a straight line
         * @param {CanvasRenderingContext2D} ctx
         * @param {Object}           values   | options for shadow drawing
         * @param {Object|undefined} viaNode1 | first control point for curve drawing
         * @param {Object|undefined} viaNode2 | second control point for curve drawing
         * @protected
         */
        protected _bezierCurve(ctx: any, values: any, viaNode1: any | any, viaNode2: any | any): void;

        /**
         * @returns {*|{x, y}|{x: undefined, y: undefined}}
         */
        getViaNode(): any | any | any;

    }

    /**
     * A Base Class for all Cubic Bezier Edges. Bezier curves are used to model
     * smooth gradual curves in paths between nodes.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends BezierEdgeBase
     */
    export class CubicBezierEdgeBase extends BezierEdgeBase {
        constructor(options: any, body: any, labelModule: Label);

    }

    /**
     * The Base Class for all edges.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     */
    export class EdgeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * Connects a node to itself
         */
        connect(): void;

        /**
         * @returns {boolean} always false
         */
        cleanup(): boolean;

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * @param {Node} nearNode
         * @param {CanvasRenderingContext2D} ctx
         * @param {Object} options
         * @returns {{x: number, y: number}}
         */
        findBorderPosition(nearNode: Node, ctx: any, options: any): any;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @returns {{from: ({x: number, y: number, t: number}|*), to: ({x: number, y: number, t: number}|*)}}
         */
        findBorderPositions(ctx: any): any;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         * @param {boolean} selected - Unused
         * @param {boolean} hover - Unused
         * @returns {string}
         */
        getColor(ctx: any, values: any, selected: boolean, hover: boolean): string;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {string} position
         * @param {Node} viaNode
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {Array} values
         * @returns {{point: *, core: {x: number, y: number}, angle: *, length: number, type: *}}
         */
        getArrowData(ctx: any, position: string, viaNode: Node, selected: boolean, hover: boolean, values: any): any;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {Object} arrowData
         */
        drawArrowHead(ctx: any, values: any, selected: boolean, hover: boolean, arrowData: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        enableShadow(ctx: any, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        disableShadow(ctx: any, values: any): void;

    }

    /**
     * A Cluster is a special Node that allows a group of Nodes positioned closely together
     * to be represented by a single Cluster Node.
     * @param {Object} options
     * @param {Object} body
     * @param {Array.<HTMLImageElement>}imagelist
     * @param {Array} grouplist
     * @param {Object} globalOptions
     * @extends Node
     */
    export class Cluster extends Node {
        constructor(options: any, body: any, imagelist: any[], grouplist: any, globalOptions: any);

    }

    /**
     * A Box Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends NodeBase
     */
    export class Box extends NodeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} [selected]
         * @param {boolean} [hover]
         */
        resize(ctx: any, selected?: boolean, hover?: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {number} x width
         * @param {number} y height
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} selected
         * @param {boolean} hover
         */
        updateBoundingBox(x: number, y: number, ctx: any, selected: boolean, hover: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A Circle Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends CircleImageBase
     */
    export class Circle extends CircleImageBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} [selected]
         * @param {boolean} [hover]
         */
        resize(ctx: any, selected?: boolean, hover?: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {number} x width
         * @param {number} y height
         */
        updateBoundingBox(x: number, y: number): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle - Unused
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A CircularImage Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @param {Image} imageObj
     * @param {Image} imageObjAlt
     * @extends CircleImageBase
     */
    export class CircularImage extends CircleImageBase {
        constructor(options: any, body: any, labelModule: Label, imageObj: Image, imageObjAlt: Image);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} [selected]
         * @param {boolean} [hover]
         */
        resize(ctx: any, selected?: boolean, hover?: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {number} x width
         * @param {number} y height
         */
        updateBoundingBox(x: number, y: number): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle - Unused
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A Database Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends NodeBase
     */
    export class Database extends NodeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} selected
         * @param {boolean} hover
         */
        resize(ctx: any, selected: boolean, hover: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A Diamond Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends ShapeBase
     */
    export class Diamond extends ShapeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A Dot Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends ShapeBase
     */
    export class Dot extends ShapeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * Am Ellipse Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends NodeBase
     */
    export class Ellipse extends NodeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx - Unused.
         * @param {boolean} [selected]
         * @param {boolean} [hover]
         */
        resize(ctx: any, selected?: boolean, hover?: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * An icon replacement for the default Node shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends NodeBase
     */
    export class Icon extends NodeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx - Unused.
         * @param {boolean} [selected]
         * @param {boolean} [hover]
         */
        resize(ctx: any, selected?: boolean, hover?: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {number} x
         * @param {number} y
         */
        updateBoundingBox(x: number, y: number): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover - Unused
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        _icon(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * An image-based replacement for the default Node shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @param {Image} imageObj
     * @param {Image} imageObjAlt
     * @extends CircleImageBase
     */
    export class Image extends CircleImageBase {
        constructor(options: any, body: any, labelModule: Label, imageObj: Image, imageObjAlt: Image);

        /**
         * @param {CanvasRenderingContext2D} ctx - Unused.
         * @param {boolean} [selected]
         * @param {boolean} [hover]
         */
        resize(ctx: any, selected?: boolean, hover?: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {number} x
         * @param {number} y
         */
        updateBoundingBox(x: number, y: number): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A Square Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends ShapeBase
     */
    export class Square extends ShapeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A Star Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends ShapeBase
     */
    export class Star extends ShapeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A text-based replacement for the default Node shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends NodeBase
     */
    export class Text extends NodeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} selected
         * @param {boolean} hover
         */
        resize(ctx: any, selected: boolean, hover: boolean): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x width
         * @param {number} y height
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A Triangle Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends ShapeBase
     */
    export class Triangle extends ShapeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x
         * @param {number} y
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * A downward facing Triangle Node/Cluster shape.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends ShapeBase
     */
    export class TriangleDown extends ShapeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x
         * @param {number} y
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} angle
         * @returns {number}
         */
        distanceToBorder(ctx: any, angle: number): number;

    }

    /**
     * NOTE: This is a bad base class
     * Child classes are:
     *   Image       - uses *only* image methods
     *   Circle      - uses *only* _drawRawCircle
     *   CircleImage - uses all
     * TODO: Refactor, move _drawRawCircle to different module, derive Circle from NodeBase
     *       Rename this to ImageBase
     *       Consolidate common code in Image and CircleImage to base class
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends NodeBase
     */
    export class CircleImageBase extends NodeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {Object} options
         * @param {Object} [imageObj]
         * @param {Object} [imageObjAlt]
         */
        setOptions(options: any, imageObj?: any, imageObjAlt?: any): void;

        /**
         * Set the images for this node.
         * The images can be updated after the initial setting of options;
         * therefore, this method needs to be reentrant.
         * For correct working in error cases, it is necessary to properly set
         * field 'nodes.brokenImage' in the options.
         * @param {Image} imageObj  required; main image to show for this node
         * @param {Image|undefined} imageObjAlt optional; image to show when node is selected
         */
        setImages(imageObj: Image, imageObjAlt: Image | any): void;

        /**
         * Set selection and switch between the base and the selected image.
         * Do the switch only if imageObjAlt exists.
         * @param {boolean} selected value of new selected state for current node
         */
        switchImages(selected: boolean): void;

        /**
         * Adjust the node dimensions for a loaded image.
         * Pre: this.imageObj is valid
         */
        _resizeImage(): void;

    }

    /**
     * The Base class for all Nodes.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     */
    export class NodeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        enableShadow(ctx: any, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        disableShadow(ctx: any, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        enableBorderDashes(ctx: any, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        disableBorderDashes(ctx: any, values: any): void;

        /**
         * Determine if the shape of a node needs to be recalculated.
         * @param {boolean} selected
         * @param {boolean} hover
         * @returns {boolean}
         * @protected
         */
        protected needsRefresh(selected: boolean, hover: boolean): boolean;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        initContextForDraw(ctx: any, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        performStroke(ctx: any, values: any): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {{toArrow: boolean, toArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), toArrowType: *, middleArrow: boolean, middleArrowScale: (number|allOptions.edges.arrows.middle.scaleFactor|{number}|Array), middleArrowType: (allOptions.edges.arrows.middle.type|{string}|string|*), fromArrow: boolean, fromArrowScale: (allOptions.edges.arrows.to.scaleFactor|{number}|allOptions.edges.arrows.middle.scaleFactor|allOptions.edges.arrows.from.scaleFactor|Array|number), fromArrowType: *, arrowStrikethrough: (*|boolean|allOptions.edges.arrowStrikethrough|{boolean}), color: undefined, inheritsColor: (string|string|string|allOptions.edges.color.inherit|{string, boolean}|Array|*), opacity: *, hidden: *, length: *, shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *, dashes: (*|boolean|Array|allOptions.edges.dashes|{boolean, array}), width: *}} values
         */
        performFill(ctx: any, values: any): void;

        /**
         * Default implementation of this method call.
         * This acts as a stub which can be overridden.
         * @param {number} x width
         * @param {number} y height
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} selected
         * @param {boolean} hover
         */
        updateBoundingBox(x: number, y: number, ctx: any, selected: boolean, hover: boolean): void;

    }

    /**
     * Base class for constructing Node/Cluster Shapes.
     * @param {Object} options
     * @param {Object} body
     * @param {Label} labelModule
     * @extends NodeBase
     */
    export class ShapeBase extends NodeBase {
        constructor(options: any, body: any, labelModule: Label);

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} [selected]
         * @param {boolean} [hover]
         * @param {Object} [values={size: this.options.size}]
         */
        resize(ctx: any, selected?: boolean, hover?: boolean, values?: any): void;

        /**
         * @param {number} x
         * @param {number} y
         */
        updateBoundingBox(x: number, y: number): void;

    }

    /**
     * @param {Object} body
     * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
     * @param {Object} options
     */
    export class BarnesHutSolver {
        constructor(body: any, physicsBody: any, options: any);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * @returns {number} random integer
         */
        seededRandom(): number;

    }

    /**
     * @param {Object} body
     * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
     * @param {Object} options
     */
    export class CentralGravitySolver {
        constructor(body: any, physicsBody: any, options: any);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Calculates forces for each node
         */
        solve(): void;

    }

    /**
     * @param {Object} body
     * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
     * @param {Object} options
     * @extends CentralGravitySolver
     */
    export class ForceAtlas2BasedCentralGravitySolver extends CentralGravitySolver {
        constructor(body: any, physicsBody: any, options: any);

    }

    /**
     * @param {Object} body
     * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
     * @param {Object} options
     * @extends BarnesHutSolver
     */
    export class ForceAtlas2BasedRepulsionSolver extends BarnesHutSolver {
        constructor(body: any, physicsBody: any, options: any);

    }

    /**
     * @param {Object} body
     * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
     * @param {Object} options
     */
    export class HierarchicalRepulsionSolver {
        constructor(body: any, physicsBody: any, options: any);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

    }

    /**
     * @param {Object} body
     * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
     * @param {Object} options
     */
    export class HierarchicalSpringSolver {
        constructor(body: any, physicsBody: any, options: any);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

    }

    /**
     * @param {Object} body
     * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
     * @param {Object} options
     */
    export class RepulsionSolver {
        constructor(body: any, physicsBody: any, options: any);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

    }

    /**
     * @param {Object} body
     * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
     * @param {Object} options
     */
    export class SpringSolver {
        constructor(body: any, physicsBody: any, options: any);

        /**
         * @param {Object} options
         */
        setOptions(options: any): void;

    }

    /**
     * Helper functions for components
     * @class
     */
    export class ComponentUtil {
        /**
         * Determine values to use for (sub)options of 'chosen'.
         * This option is either a boolean or an object whose values should be examined further.
         * The relevant structures are:
         * - chosen: <boolean value>
         * - chosen: { subOption: <boolean or function> }
         * Where subOption is 'node', 'edge' or 'label'.
         * The intention of this method appears to be to set a specific priority to the options;
         * Since most properties are either bridged or merged into the local options objects, there
         * is not much point in handling them separately.
         * TODO: examine if 'most' in previous sentence can be replaced with 'all'. In that case, we
         *       should be able to get rid of this method.
         * @param {string}  subOption  option within object 'chosen' to consider; either 'node', 'edge' or 'label'
         * @param {Object}  pile       array of options objects to consider
         * @return {boolean|function}  value for passed subOption of 'chosen' to use
         */
        static choosify(subOption: string, pile: any): boolean | any;

    }

    /**
     * @inheritDoc
     */
    export class LabelAccumulator {
        constructor();

        /**
         * Returns the width in pixels of the current line.
         * @returns {number}
         */
        curWidth(): number;

        /**
         * Add text in block to current line
         * @param {string} text
         * @param {'bold'|'ital'|'boldital'|'mono'|'normal'} [mod='normal']
         */
        append(text: string, mod?: any | any | any | any | any): void;

        /**
         * Add text in block to current line and start a new line
         * @param {string} text
         * @param {'bold'|'ital'|'boldital'|'mono'|'normal'} [mod='normal']
         */
        newLine(text: string, mod?: any | any | any | any | any): void;

        /**
         * Set the sizes for all lines and the whole thing.
         * @returns {{width: (number|*), height: (number|*), lines: Array}}
         */
        finalize(): any;

    }

    /**
     * A Label to be used for Nodes or Edges.
     * @param {Object} body
     * @param {Object} options
     * @param {boolean} [edgelabel=false]
     */
    export class Label {
        constructor(body: any, options: any, edgelabel?: boolean);

        /**
         * @param {Object} options
         * @param {boolean} [allowDeletion=false]
         */
        setOptions(options: any, allowDeletion?: boolean): void;

        /**
         * @param {Object} parentOptions
         * @param {Object} newOptions
         * @param {boolean} [allowDeletion=false]
         * @static
         */
        static parseOptions(parentOptions: any, newOptions: any, allowDeletion?: boolean): void;

        /**
         * If in-variable is a string, parse it as a font specifier.
         * Note that following is not done here and have to be done after the call:
         * - No number conversion (size)
         * - Not all font options are set (vadjust, mod)
         * @param {Object} outOptions  out-parameter, object in which to store the parse results (if any)
         * @param {Object} inOptions  font options to parse
         * @return {boolean} true if font parsed as string, false otherwise
         * @static
         */
        static parseFontString(outOptions: any, inOptions: any): boolean;

        /**
         * Set options and update internal state
         * @param {Object} options  options to set
         * @param {Array}  pile     array of option objects to consider for option 'chosen'
         */
        update(options: any, pile: any): void;

        /**
         * When margins are set in an element, adjust sizes is called to remove them
         * from the width/height constraints. This must be done prior to label sizing.
         * @param {{top: number, right: number, bottom: number, left: number}} margins
         */
        adjustSizes(margins: any): void;

        /**
         * Collapse the font options for the multi-font to single objects, from
         * the chain of option objects passed.
         * If an option for a specific multi-font is not present, the parent
         * option is checked for the given option.
         * NOTE: naming of 'groupOptions' is a misnomer; the actual value passed
         *       is the new values to set from setOptions().
         * @param {Object} options
         * @param {Object} groupOptions
         * @param {Object} defaultOptions
         */
        propagateFonts(options: any, groupOptions: any, defaultOptions: any): void;

        /**
         * Main function. This is called from anything that wants to draw a label.
         * @param {CanvasRenderingContext2D} ctx
         * @param {number} x
         * @param {number} y
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {string} [baseline='middle']
         */
        draw(ctx: any, x: number, y: number, selected: boolean, hover: boolean, baseline?: string): void;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} selected
         * @param {boolean} hover
         * @returns {{width: number, height: number}}
         */
        getTextSize(ctx: any, selected?: boolean, hover?: boolean): any;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {'middle'|'hanging'} [baseline='middle']
         */
        calculateLabelSize(ctx: any, selected: boolean, hover: boolean, x?: number, y?: number, baseline?: any | any): void;

        /**
         * normalize the markup system
         * @param {boolean|'md'|'markdown'|'html'} markupSystem
         * @returns {string}
         */
        decodeMarkupSystem(markupSystem: boolean | any | any | any): string;

        /**
         * Explodes a piece of text into single-font blocks using a given markup
         * @param {string} text
         * @param {boolean|'md'|'markdown'|'html'} markupSystem
         * @returns {Array.<{text: string, mod: string}>}
         */
        splitBlocks(text: string, markupSystem: boolean | any | any | any): any[];

        /**
         * @param {string} text
         * @returns {Array}
         */
        splitMarkdownBlocks(text: string): any;

        /**
         * @param {string} text
         * @returns {Array}
         */
        splitHtmlBlocks(text: string): any;

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} selected
         * @param {boolean} hover
         * @param {string} mod
         * @returns {{color, size, face, mod, vadjust, strokeWidth: *, strokeColor: (*|string|allOptions.edges.font.strokeColor|{string}|allOptions.nodes.font.strokeColor|Array)}}
         */
        getFormattingValues(ctx: any, selected: boolean, hover: boolean, mod: string): any;

        /**
         * @param {boolean} selected
         * @param {boolean} hover
         * @returns {boolean}
         */
        differentState(selected: boolean, hover: boolean): boolean;

    }

    /**
     * Turn an element into an clickToUse element.
     * When not active, the element has a transparent overlay. When the overlay is
     * clicked, the mode is changed to active.
     * When active, the element is displayed with a blue border around it, and
     * the interactive contents of the element can be used. When clicked outside
     * the element, the elements mode is changed to inactive.
     * @param {Element} container
     * @constructor Activator
     */
    export class Activator {
        constructor(container: any);

        /**
         * Destroy the activator. Cleans up all created DOM and event listeners
         */
        destroy(): void;

        /**
         * Activate the element
         * Overlay is hidden, element is decorated with a blue shadow border
         */
        activate(): void;

        /**
         * Deactivate the element
         * Overlay is displayed on top of the element
         */
        deactivate(): void;

    }

    /**
     * @param {number} [pixelRatio=1]
     */
    export class ColorPicker {
        constructor(pixelRatio?: number);

        /**
         * this inserts the colorPicker into a div from the DOM
         * @param {Element} container
         */
        insertTo(container: any): void;

        /**
         * the callback is executed on apply and save. Bind it to the application
         * @param {function} callback
         */
        setUpdateCallback(callback: any): void;

        /**
         * the callback is executed on apply and save. Bind it to the application
         * @param {function} callback
         */
        setCloseCallback(callback: any): void;

        /**
         * Set the color of the colorPicker
         * Supported formats:
         * 'red'                   --> HTML color string
         * '#ffffff'               --> hex string
         * 'rbg(255,255,255)'      --> rgb string
         * 'rgba(255,255,255,1.0)' --> rgba string
         * {r:255,g:255,b:255}     --> rgb object
         * {r:255,g:255,b:255,a:1.0} --> rgba object
         * @param {string|Object} color
         * @param {boolean} [setInitial=true]
         */
        setColor(color: string | any, setInitial?: boolean): void;

        /**
         * this shows the color picker.
         * The hue circle is constructed once and stored.
         */
        show(): void;

    }

    /**
     * The way this works is for all properties of this.possible options, you can supply the property name in any form to list the options.
     * Boolean options are recognised as Boolean
     * Number options should be written as array: [default value, min value, max value, stepsize]
     * Colors should be written as array: ['color', '#ffffff']
     * Strings with should be written as array: [option1, option2, option3, ..]
     * The options are matched with their counterparts in each of the modules and the values used in the configuration are
     * @param {Object} parentModule        | the location where parentModule.setOptions() can be called
     * @param {Object} defaultContainer    | the default container of the module
     * @param {Object} configureOptions    | the fully configured and predefined options set found in allOptions.js
     * @param {number} pixelRatio          | canvas pixel ratio
     */
    export class Configurator {
        constructor(parentModule: any, defaultContainer: any, configureOptions: any, pixelRatio: number);

        /**
         * refresh all options.
         * Because all modules parse their options by themselves, we just use their options. We copy them here.
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * @param {Object} moduleOptions
         */
        setModuleOptions(moduleOptions: any): void;

        /**
         * @returns {{}} options
         */
        getOptions(): any;

    }

    /**
     * Popup is a class to create a popup window with some text
     * @param {Element} container       The container object.
     * @param {string}  overflowMethod  How the popup should act to overflowing ('flip' or 'cap')
     */
    export class Popup {
        constructor(container: any, overflowMethod: string);

        /**
         * @param {number} x   Horizontal position of the popup window
         * @param {number} y   Vertical position of the popup window
         */
        setPosition(x: number, y: number): void;

        /**
         * Set the content for the popup window. This can be HTML code or text.
         * @param {string | Element} content
         */
        setText(content: string | any): void;

        /**
         * Show the popup window
         * @param {boolean} [doShow]    Show or hide the window
         */
        show(doShow?: boolean): void;

        /**
         * Hide the popup window
         */
        hide(): void;

        /**
         * Remove the popup window
         */
        destroy(): void;

    }

    /**
     *  Used to validate options.
     */
    export class Validator {
        constructor();

        /**
         * Main function to be called
         * @param {Object} options
         * @param {Object} referenceOptions
         * @param {Object} subObject
         * @returns {boolean}
         * @static
         */
        static validate(options: any, referenceOptions: any, subObject: any): boolean;

        /**
         * Will traverse an object recursively and check every value
         * @param {Object} options
         * @param {Object} referenceOptions
         * @param {array} path    | where to look for the actual option
         * @static
         */
        static parse(options: any, referenceOptions: any, path: any): void;

        /**
         * Check every value. If the value is an object, call the parse function on that object.
         * @param {string} option
         * @param {Object} options
         * @param {Object} referenceOptions
         * @param {array} path    | where to look for the actual option
         * @static
         */
        static check(option: string, options: any, referenceOptions: any, path: any): void;

        /**
         * @param {string}  option           | the option property
         * @param {Object}  options          | The supplied options object
         * @param {Object}  referenceOptions | The reference options containing all options and their allowed formats
         * @param {string}  referenceOption  | Usually this is the same as option, except when handling an __any__ tag.
         * @param {string}  refOptionObj     | This is the type object from the reference options
         * @param {Array}   path             | where in the object is the option
         * @static
         */
        static checkFields(option: string, options: any, referenceOptions: any, referenceOption: string, refOptionObj: string, path: any): void;

        /**
         * @param {Object|boolean|number|string|Array.<number>|Date|Node|Moment|undefined|null} object
         * @returns {string}
         * @static
         */
        static getType(object: any | boolean | number | string | number[] | any | Node | any | any | any): string;

        /**
         * @param {string} option
         * @param {Object} options
         * @param {Array.<string>} path
         * @static
         */
        static getSuggestion(option: string, options: any, path: string[]): void;

        /**
         * traverse the options in search for a match.
         * @param {string} option
         * @param {Object} options
         * @param {Array} path    | where to look for the actual option
         * @param {boolean} [recursive=false]
         * @returns {{closestMatch: string, path: Array, distance: number}}
         * @static
         */
        static findInOptions(option: string, options: any, path: any, recursive?: boolean): any;

        /**
         * @param {Array.<string>} path
         * @param {Object} option
         * @param {string} prefix
         * @returns {String}
         * @static
         */
        static printLocation(path: string[], option: any, prefix?: string): any;

        /**
         * @param {Object} options
         * @returns {String}
         * @static
         */
        static print(options: any): any;

        /**
         *  Compute the edit distance between the two given strings
         * http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
         * Copyright (c) 2011 Andrei Mackenzie
         * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
         * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
         * @param {string} a
         * @param {string} b
         * @returns {Array.<Array.<number>>}}
         * @static
         */
        static levenshteinDistance(a: string, b: string): (number[])[];

    }

    /**
     * Create a timeline visualization
     * @constructor Core
     */
    export class Core {
        /**
         * Create the main DOM for the Core: a root panel containing left, right,
         * top, bottom, content, and background panel.
         * @param {Element} container  The container element where the Core will
         *                             be attached.
         * @protected
         */
        protected _create(container: any): void;

        /**
         * Set options. Options will be passed to all components loaded in the Timeline.
         * @param {Object} [options]
         *                           {String} orientation
         *                              Vertical orientation for the Timeline,
         *                              can be 'bottom' (default) or 'top'.
         *                           {string | number} width
         *                              Width for the timeline, a number in pixels or
         *                              a css string like '1000px' or '75%'. '100%' by default.
         *                           {string | number} height
         *                              Fixed height for the Timeline, a number in pixels or
         *                              a css string like '400px' or '75%'. If undefined,
         *                              The Timeline will automatically size such that
         *                              its contents fit.
         *                           {string | number} minHeight
         *                              Minimum height for the Timeline, a number in pixels or
         *                              a css string like '400px' or '75%'.
         *                           {string | number} maxHeight
         *                              Maximum height for the Timeline, a number in pixels or
         *                              a css string like '400px' or '75%'.
         *                           {number | Date | string} start
         *                              Start date for the visible window
         *                           {number | Date | string} end
         *                              End date for the visible window
         */
        setOptions(options?: any): void;

        /**
         * Returns true when the Timeline is active.
         * @returns {boolean}
         */
        isActive(): boolean;

        /**
         * Destroy the Core, clean up all DOM elements and event listeners.
         */
        destroy(): void;

        /**
         * Set a custom time bar
         * @param {Date} time
         * @param {number} [id=undefined] Optional id of the custom time bar to be adjusted.
         */
        setCustomTime(time: any, id?: number): void;

        /**
         * Retrieve the current custom time.
         * @param {number} [id=undefined]    Id of the custom time bar.
         * @return {Date | undefined} customTime
         */
        getCustomTime(id?: number): any | any;

        /**
         * Set a custom title for the custom time bar.
         * @param {string} [title] Custom title
         * @param {number} [id=undefined]    Id of the custom time bar.
         * @returns {*}
         */
        setCustomTimeTitle(title?: string, id?: number): any;

        /**
         * Retrieve meta information from an event.
         * Should be overridden by classes extending Core
         * @param {Event} event
         * @return {Object} An object with related information.
         */
        getEventProperties(event: any): any;

        /**
         * Add custom vertical bar
         * @param {Date | string | number} [time]  A Date, unix timestamp, or
         *                                         ISO date string. Time point where
         *                                         the new bar should be placed.
         *                                         If not provided, `new Date()` will
         *                                         be used.
         * @param {number | string} [id=undefined] Id of the new bar. Optional
         * @return {number | string}               Returns the id of the new bar
         */
        addCustomTime(time?: any | string | number, id?: number | string): number | string;

        /**
         * Remove previously added custom bar
         * @param {int} id ID of the custom bar to be removed
         * [at]returns {boolean} True if the bar exists and is removed, false otherwise
         */
        removeCustomTime(id: any): void;

        /**
         * Get the id's of the currently visible items.
         * @returns {Array} The ids of the visible items
         */
        getVisibleItems(): any;

        /**
         * Set Core window such that it fits all items
         * @param {Object} [options]  Available options:
         *                                `animation: boolean | {duration: number, easingFunction: string}`
         *                                    If true (default), the range is animated
         *                                    smoothly to the new window. An object can be
         *                                    provided to specify duration and easing function.
         *                                    Default duration is 500 ms, and default easing
         *                                    function is 'easeInOutQuad'.
         * @param {function} [callback] a callback funtion to be executed at the end of this function
         */
        fit(options?: any, callback?: any): void;

        /**
         * Calculate the data range of the items start and end dates
         * [at]returns {{min: [Date], max: [Date]}}
         * @protected
         */
        protected getDataRange(): void;

        /**
         * Set the visible window. Both parameters are optional, you can change only
         * start or only end. Syntax:
         *     TimeLine.setWindow(start, end)
         *     TimeLine.setWindow(start, end, options)
         *     TimeLine.setWindow(range)
         * Where start and end can be a Date, number, or string, and range is an
         * object with properties start and end.
         * @param {Date | number | string | Object} [start] Start date of visible window
         * @param {Date | number | string} [end]            End date of visible window
         * @param {Object} [options]  Available options:
         *                                `animation: boolean | {duration: number, easingFunction: string}`
         *                                    If true (default), the range is animated
         *                                    smoothly to the new window. An object can be
         *                                    provided to specify duration and easing function.
         *                                    Default duration is 500 ms, and default easing
         *                                    function is 'easeInOutQuad'.
         * @param {function} [callback] a callback funtion to be executed at the end of this function
         */
        setWindow(start?: any | number | string | any, end?: any | number | string, options?: any, callback?: any): void;

        /**
         * Move the window such that given time is centered on screen.
         * @param {Date | number | string} time
         * @param {Object} [options]  Available options:
         *                                `animation: boolean | {duration: number, easingFunction: string}`
         *                                    If true (default), the range is animated
         *                                    smoothly to the new window. An object can be
         *                                    provided to specify duration and easing function.
         *                                    Default duration is 500 ms, and default easing
         *                                    function is 'easeInOutQuad'.
         * @param {function} [callback] a callback funtion to be executed at the end of this function
         */
        moveTo(time: any | number | string, options?: any, callback?: any): void;

        /**
         * Get the visible window
         * @return {{start: Date, end: Date}}   Visible range
         */
        getWindow(): any;

        /**
         * Zoom in the window such that given time is centered on screen.
         * @param {number} percentage - must be between [0..1]
         * @param {Object} [options]  Available options:
         *                                `animation: boolean | {duration: number, easingFunction: string}`
         *                                    If true (default), the range is animated
         *                                    smoothly to the new window. An object can be
         *                                    provided to specify duration and easing function.
         *                                    Default duration is 500 ms, and default easing
         *                                    function is 'easeInOutQuad'.
         * @param {function} [callback] a callback funtion to be executed at the end of this function
         */
        zoomIn(percentage: number, options?: any, callback?: any): void;

        /**
         * Zoom out the window such that given time is centered on screen.
         * @param {number} percentage - must be between [0..1]
         * @param {Object} [options]  Available options:
         *                                `animation: boolean | {duration: number, easingFunction: string}`
         *                                    If true (default), the range is animated
         *                                    smoothly to the new window. An object can be
         *                                    provided to specify duration and easing function.
         *                                    Default duration is 500 ms, and default easing
         *                                    function is 'easeInOutQuad'.
         * @param {function} [callback] a callback funtion to be executed at the end of this function
         */
        zoomOut(percentage: number, options?: any, callback?: any): void;

        /**
         * Force a redraw. Can be overridden by implementations of Core
         * Note: this function will be overridden on construction with a trottled version
         */
        redraw(): void;

        /**
         * Redraw for internal use. Redraws all components. See also the public
         * method redraw.
         * @protected
         */
        protected _redraw(): void;

        /**
         * Set a current time. This can be used for example to ensure that a client's
         * time is synchronized with a shared server time.
         * Only applicable when option `showCurrentTime` is true.
         * @param {Date | string | number} time     A Date, unix timestamp, or
         *                                          ISO date string.
         */
        setCurrentTime(time: any | string | number): void;

        /**
         * Get the current time.
         * Only applicable when option `showCurrentTime` is true.
         * @return {Date} Returns the current time.
         */
        getCurrentTime(): any;

        /**
         * Convert a position on screen (pixels) to a datetime
         * @param {int}     x    Position on the screen in pixels
         * @return {Date}   time The datetime the corresponds with given position x
         * @protected
         */
        protected _toTime(x: any): any;

        /**
         * Convert a position on the global screen (pixels) to a datetime
         * @param {int}     x    Position on the screen in pixels
         * @return {Date}   time The datetime the corresponds with given position x
         * @protected
         */
        protected _toGlobalTime(x: any): any;

        /**
         * Convert a datetime (Date object) into a position on the screen
         * @param {Date}   time A date
         * @return {int}   x    The position on the screen in pixels which corresponds
         *                      with the given date.
         * @protected
         */
        protected _toScreen(time: any): any;

        /**
         * Convert a datetime (Date object) into a position on the root
         * This is used to get the pixel density estimate for the screen, not the center panel
         * @param {Date}   time A date
         * @return {int}   x    The position on root in pixels which corresponds
         *                      with the given date.
         * @protected
         */
        protected _toGlobalScreen(time: any): any;

    }

    /**
     * used in Core to convert the options into a volatile variable
     * @param {function} moment
     * @param {Object} body
     * @param {Array | Object} hiddenDates
     * @returns {number}
     */
    export function convertHiddenOptions(moment: any, body: any, hiddenDates: any | any): number;

    /**
     * create new entrees for the repeating hidden dates
     * @param {function} moment
     * @param {Object} body
     * @param {Array | Object} hiddenDates
     * @returns {null}
     */
    export function updateHiddenDates(moment: any, body: any, hiddenDates: any | any): any;

    /**
     * remove duplicates from the hidden dates list. Duplicates are evil. They mess everything up.
     * Scales with N^2
     * @param {Object} body
     */
    export function removeDuplicates(body: any): void;

    /**
     * Used in TimeStep to avoid the hidden times.
     * @param {function} moment
     * @param {TimeStep} timeStep
     * @param {Date} previousTime
     */
    export function stepOverHiddenDates(moment: any, timeStep: TimeStep, previousTime: any): void;

    /**
     * replaces the Core toScreen methods
     * @param {Core} Core
     * @param {Date} time
     * @param {number} width
     * @returns {number}
     */
    export function toScreen(Core: Core, time: any, width: number): number;

    /**
     * Replaces the core toTime methods
     * @param {Core} Core
     * @param {number} x
     * @param {number} width
     * @returns {Date}
     */
    export function toTime(Core: Core, x: number, width: number): any;

    /**
     * Support function
     * @param {Array.<{start: Window.start, end: *}>} hiddenDates
     * @param {number} start
     * @param {number} end
     * @returns {number}
     */
    export function getHiddenDurationBetween(hiddenDates: any[], start: number, end: number): number;

    /**
     * Support function
     * @param {Array.<{start: Window.start, end: *}>} hiddenDates
     * @param {number} start
     * @param {number} end
     * @returns {number}
     */
    export function getHiddenDurationBeforeStart(hiddenDates: any[], start: number, end: number): number;

    /**
     * Support function
     * @param {function} moment
     * @param {Array.<{start: Window.start, end: *}>} hiddenDates
     * @param {{start: number, end: number}} range
     * @param {Date} time
     * @returns {number}
     */
    export function correctTimeForHidden(moment: any, hiddenDates: any[], range: any, time: any): number;

    /**
     * sum the duration from start to finish, including the hidden duration,
     * until the required amount has been reached, return the accumulated hidden duration
     * @param {Array.<{start: Window.start, end: *}>} hiddenDates
     * @param {{start: number, end: number}} range
     * @param {number} [requiredDuration=0]
     * @returns {number}
     */
    export function getAccumulatedHiddenDuration(hiddenDates: any[], range: any, requiredDuration?: number): number;

    /**
     * used to step over to either side of a hidden block. Correction is disabled on tablets, might be set to true
     * @param {Array.<{start: Window.start, end: *}>} hiddenDates
     * @param {Date} time
     * @param {number} direction
     * @param {boolean} correctionEnabled
     * @returns {Date|number}
     */
    export function snapAwayFromHidden(hiddenDates: any[], time: any, direction: number, correctionEnabled: boolean): any | number;

    /**
     * Check if a time is hidden
     * @param {Date} time
     * @param {Array.<{start: Window.start, end: *}>} hiddenDates
     * @returns {{hidden: boolean, startDate: Window.start, endDate: *}}
     */
    export function isHidden(time: any, hiddenDates: any[]): any;

    /**
     * Create a timeline visualization
     * @param {HTMLElement} container
     * @param {DataSet | Array} [items]
     * @param {DataSet | Array | DataView | Object} [groups]
     * @param {Object} [options]  See Graph2d.setOptions for the available options.
     * @constructor Graph2d
     * @extends Core
     */
    export class Graph2d extends Core {
        constructor(container: any, items?: DataSet | any, groups?: DataSet | any | DataView | any, options?: any);

        /**
         * Set items
         * @param {DataSet | Array | null} items
         */
        setItems(items: DataSet | any | any): void;

        /**
         * Set groups
         * @param {DataSet | Array} groups
         */
        setGroups(groups: DataSet | any): void;

        /**
         * Returns an object containing an SVG element with the icon of the group (size determined by iconWidth and iconHeight), the label of the group (content) and the yAxisOrientation of the group (left or right).
         * @param {GraphGroup.id} groupId
         * @param {number} width
         * @param {number} height
         * @returns {{icon: SVGElement, label: string, orientation: string}|string}
         */
        getLegend(groupId: any, width: number, height: number): any | string;

        /**
         * This checks if the visible option of the supplied group (by ID) is true or false.
         * @param {GraphGroup.id} groupId
         * @returns {boolean}
         */
        isGroupVisible(groupId: any): boolean;

        /**
         * Get the data range of the item set.
         * @returns {{min: Date, max: Date}} range  A range with a start and end Date.
         *                                          When no minimum is found, min==null
         *                                          When no maximum is found, max==null
         */
        getDataRange(): any;

        /**
         * Generate Timeline related information from an event
         * @param {Event} event
         * @return {Object} An object with related information, like on which area
         *                  The event happened, whether clicked on an item, etc.
         */
        getEventProperties(event: any): any;

    }

    /**
     * Test whether direction has a valid value
     * @param {string} direction    'horizontal' or 'vertical'
     */
    export function validateDirection(direction: string): void;

    /**
     * Order items by their start data
     * @param {Item[]} items
     */
    export function orderByStart(items: (Item)[]): void;

    /**
     * Order items by their end date. If they have no end date, their start date
     * is used.
     * @param {Item[]} items
     */
    export function orderByEnd(items: (Item)[]): void;

    /**
     * Adjust vertical positions of the items such that they don't overlap each
     * other.
     * @param {Item[]} items
     *            All visible items
     * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
     *            Margins between items and between items and the axis.
     * @param {boolean} [force=false]
     *            If true, all items will be repositioned. If false (default), only
     *            items having a top===null will be re-stacked
     */
    export function stack(items: (Item)[], margin: any, force?: boolean): void;

    /**
     * Adjust vertical positions of the items without stacking them
     * @param {Item[]} items
     *            All visible items
     * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
     *            Margins between items and between items and the axis.
     * @param {subgroups[]} subgroups
     *            All subgroups
     * @param {boolean} stackSubgroups
     */
    export function nostack(items: (Item)[], margin: any, subgroups: any[], stackSubgroups: boolean): void;

    /**
     * Adjust vertical positions of the subgroups such that they don't overlap each
     * other.
     * @param {Array.<Item>} items
     * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin Margins between items and between items and the axis.
     * @param {subgroups[]} subgroups
     *            All subgroups
     */
    export function stackSubgroups(items: (Item)[], margin: any, subgroups: any[]): void;

    /**
     * Test if the two provided items collide
     * The items must have parameters left, width, top, and height.
     * @param {Item} a          The first item
     * @param {Item} b          The second item
     * @param {{horizontal: number, vertical: number}} margin
     *                          An object containing a horizontal and vertical
     *                          minimum required margin.
     * @param {boolean} rtl
     * @return {boolean}        true if a and b collide, else false
     */
    export function collision(a: Item, b: Item, margin: any, rtl: boolean): boolean;

    /**
     * Test if the two provided objects collide
     * The objects must have parameters start, end, top, and height.
     * @param {Object} a          The first Object
     * @param {Object} b          The second Object
     * @return {boolean}        true if a and b collide, else false
     */
    export function collisionByTimes(a: any, b: any): boolean;

    /**
     * The class TimeStep is an iterator for dates. You provide a start date and an
     * end date. The class itself determines the best scale (step size) based on the
     * provided start Date, end Date, and minimumStep.
     * If minimumStep is provided, the step size is chosen as close as possible
     * to the minimumStep but larger than minimumStep. If minimumStep is not
     * provided, the scale is set to 1 DAY.
     * The minimumStep should correspond with the onscreen size of about 6 characters
     * Alternatively, you can set a scale by hand.
     * After creation, you can initialize the class by executing first(). Then you
     * can iterate from the start date to the end date via next(). You can check if
     * the end date is reached with the function hasNext(). After each step, you can
     * retrieve the current date via getCurrent().
     * The TimeStep has scales ranging from milliseconds, seconds, minutes, hours,
     * days, to years.
     * Version: 1.2
     * @param {Date} [start]         The start date, for example new Date(2010, 9, 21)
     *                               or new Date(2010, 9, 21, 23, 45, 00)
     * @param {Date} [end]           The end date
     * @param {number} [minimumStep] Optional. Minimum step size in milliseconds
     * @param {Date|Array.<Date>} [hiddenDates] Optional.
     * @param {{showMajorLabels: boolean}} [options] Optional.
     * @constructor  TimeStep
     */
    export class TimeStep {
        constructor(start?: any, end?: any, minimumStep?: number, hiddenDates?: any | any[], options?: any);

        /**
         * Set custom constructor function for moment. Can be used to set dates
         * to UTC or to set a utcOffset.
         * @param {function} moment
         */
        setMoment(moment: any): void;

        /**
         * Set custom formatting for the minor an major labels of the TimeStep.
         * Both `minorLabels` and `majorLabels` are an Object with properties:
         * 'millisecond', 'second', 'minute', 'hour', 'weekday', 'day', 'week', 'month', 'year'.
         * @param {{minorLabels: Object, majorLabels: Object}} format
         */
        setFormat(format: any): void;

        /**
         * Set a new range
         * If minimumStep is provided, the step size is chosen as close as possible
         * to the minimumStep but larger than minimumStep. If minimumStep is not
         * provided, the scale is set to 1 DAY.
         * The minimumStep should correspond with the onscreen size of about 6 characters
         * @param {Date} [start]      The start date and time.
         * @param {Date} [end]        The end date and time.
         * @param {int} [minimumStep] Optional. Minimum step size in milliseconds
         */
        setRange(start?: any, end?: any, minimumStep?: any): void;

        /**
         * Set the range iterator to the start date.
         */
        start(): void;

        /**
         * Round the current date to the first minor date value
         * This must be executed once when the current date is set to start Date
         */
        roundToMinor(): void;

        /**
         * Check if the there is a next step
         * @return {boolean}  true if the current date has not passed the end date
         */
        hasNext(): boolean;

        /**
         * Do the next step
         */
        next(): void;

        /**
         * Get the current datetime
         * @return {Moment}  current The current date
         */
        getCurrent(): any;

        /**
         * Set a custom scale. Autoscaling will be disabled.
         * For example setScale('minute', 5) will result
         * in minor steps of 5 minutes, and major steps of an hour.
         * @param {{scale: string, step: number}} params
         *                               An object containing two properties:
         *                               - A string 'scale'. Choose from 'millisecond', 'second',
         *                                 'minute', 'hour', 'weekday', 'day', 'week', 'month', 'year'.
         *                               - A number 'step'. A step size, by default 1.
         *                                 Choose for example 1, 2, 5, or 10.
         */
        setScale(params: any): void;

        /**
         * Enable or disable autoscaling
         * @param {boolean} enable  If true, autoascaling is set true
         */
        setAutoScale(enable: boolean): void;

        /**
         * Automatically determine the scale that bests fits the provided minimum step
         * @param {number} [minimumStep]  The minimum step size in milliseconds
         */
        setMinimumStep(minimumStep?: number): void;

        /**
         * Snap a date to a rounded value.
         * The snap intervals are dependent on the current scale and step.
         * Static function
         * @param {Date} date    the date to be snapped.
         * @param {string} scale Current scale, can be 'millisecond', 'second',
         *                       'minute', 'hour', 'weekday, 'day', 'week', 'month', 'year'.
         * @param {number} step  Current step (1, 2, 4, 5, ...
         * @return {Date} snappedDate
         */
        static snap(date: any, scale: string, step: number): any;

        /**
         * Check if the current value is a major value (for example when the step
         * is DAY, a major value is each first day of the MONTH)
         * @return {boolean} true if current date is major, else false.
         */
        isMajor(): boolean;

        /**
         * Returns formatted text for the minor axislabel, depending on the current
         * date and the scale. For example when scale is MINUTE, the current time is
         * formatted as "hh:mm".
         * @param {Date} [date=this.current] custom date. if not provided, current date is taken
         * @returns {string}
         */
        getLabelMinor(date?: any): string;

        /**
         * Returns formatted text for the major axis label, depending on the current
         * date and the scale. For example when scale is MINUTE, the major scale is
         * hours, and the hour will be formatted as "hh".
         * @param {Date} [date=this.current] custom date. if not provided, current date is taken
         * @returns {string}
         */
        getLabelMajor(date?: any): string;

    }

    /**
     * Create a timeline visualization
     * @param {HTMLElement} container
     * @param {DataSet | DataView | Array} [items]
     * @param {DataSet | DataView | Array} [groups]
     * @param {Object} [options]  See Timeline.setOptions for the available options.
     * @constructor Timeline
     * @extends Core
     */
    export class Timeline extends Core {
        constructor(container: any, items?: DataSet | DataView | any, groups?: DataSet | DataView | any, options?: any);

        /**
         * Force a redraw. The size of all items will be recalculated.
         * Can be useful to manually redraw when option autoResize=false and the window
         * has been resized, or when the items CSS has been changed.
         * Note: this function will be overridden on construction with a trottled version
         */
        redraw(): void;

        /**
         * Set items
         * @param {DataSet | Array | null} items
         */
        setItems(items: DataSet | any | any): void;

        /**
         * Set groups
         * @param {DataSet | Array} groups
         */
        setGroups(groups: DataSet | any): void;

        /**
         * Set both items and groups in one go
         * @param {{items: (Array | DataSet), groups: (Array | DataSet)}} data
         */
        setData(data: any): void;

        /**
         * Set selected items by their id. Replaces the current selection
         * Unknown id's are silently ignored.
         * @param {string[] | string} [ids]  An array with zero or more id's of the items to be
         *                                selected. If ids is an empty array, all items will be
         *                                unselected.
         * @param {Object} [options]      Available options:
         *                                `focus: boolean`
         *                                    If true, focus will be set to the selected item(s)
         *                                `animation: boolean | {duration: number, easingFunction: string}`
         *                                    If true (default), the range is animated
         *                                    smoothly to the new window. An object can be
         *                                    provided to specify duration and easing function.
         *                                    Default duration is 500 ms, and default easing
         *                                    function is 'easeInOutQuad'.
         *                                    Only applicable when option focus is true.
         */
        setSelection(ids?: string[] | string, options?: any): void;

        /**
         * Get the selected items by their id
         * @return {Array.<string|number>} ids  The ids of the selected items
         */
        getSelection(): (string | number)[];

        /**
         * Adjust the visible window such that the selected item (or multiple items)
         * are centered on screen.
         * @param {string | string[]} id     An item id or array with item ids
         * @param {Object} [options]      Available options:
         *                                `animation: boolean | {duration: number, easingFunction: string}`
         *                                    If true (default), the range is animated
         *                                    smoothly to the new window. An object can be
         *                                    provided to specify duration and easing function.
         *                                    Default duration is 500 ms, and default easing
         *                                    function is 'easeInOutQuad'.
         */
        focus(id: string | string[], options?: any): void;

        /**
         * Set Timeline window such that it fits all items
         * @param {Object} [options]  Available options:
         *                                `animation: boolean | {duration: number, easingFunction: string}`
         *                                    If true (default), the range is animated
         *                                    smoothly to the new window. An object can be
         *                                    provided to specify duration and easing function.
         *                                    Default duration is 500 ms, and default easing
         *                                    function is 'easeInOutQuad'.
         */
        fit(options?: any): void;

        /**
         * Determine the range of the items, taking into account their actual width
         * and a margin of 10 pixels on both sides.
         * @returns {{min: Date, max: Date}}
         */
        getItemRange(): any;

        /**
         * Calculate the data range of the items start and end dates
         * @returns {{min: Date, max: Date}}
         */
        getDataRange(): any;

        /**
         * Generate Timeline related information from an event
         * @param {Event} event
         * @return {Object} An object with related information, like on which area
         *                  The event happened, whether clicked on an item, etc.
         */
        getEventProperties(event: any): any;

        /**
         * Toggle Timeline rolling mode
         */
        toggleRollingMode(): void;

    }

    /**
     * @param {Item} item
     * @returns {number}
     */
    export function getStart(item: Item): number;

    /**
     * @param {Item} item
     * @returns {number}
     */
    export function getEnd(item: Item): number;

    /**
     * @constructor BackgroundGroup
     * @param {number | string} groupId
     * @param {Object} data
     * @param {ItemSet} itemSet
     * @extends Group
     */
    export class BackgroundGroup extends Group {
        constructor(groupId: number | string, data: any, itemSet: (body: any, options?: any) => void);

        /**
         * Repaint this group
         * @param {{start: number, end: number}} range
         * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
         * @param {boolean} [forceRestack=false]  Force restacking of all items
         * @return {boolean} Returns true if the group is resized
         */
        redraw(range: any, margin: any, forceRestack?: boolean): boolean;

        /**
         * Show this group: attach to the DOM
         */
        show(): void;

    }

    /**
     * Prototype for visual components
     * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} [body]
     * @param {Object} [options]
     * @class
     */
    export class Component {
        constructor(body?: any, options?: any);

        /**
         * Set options for the component. The new options will be merged into the
         * current options.
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * Repaint the component
         * @return {boolean} Returns true if the component is resized
         */
        redraw(): boolean;

        /**
         * Destroy the component. Cleanup DOM and event listeners
         */
        destroy(): void;

        /**
         * Test whether the component is resized since the last time _isResized() was
         * called.
         * @return {Boolean} Returns true if the component is resized
         * @protected
         */
        protected _isResized(): any;

    }

    /**
     * A current time bar
     * @param {{range: Range, dom: Object, domProps: Object}} body
     * @param {Object} [options]        Available parameters:
     *                                  {Boolean} [showCurrentTime]
     * @prototype CurrentTime
     * @constructor CurrentTime
     */
    export class CurrentTime {
        constructor(body: any, options?: any);

        /**
         * Destroy the CurrentTime bar
         */
        destroy(): void;

        /**
         * Set options for the component. Options will be merged in current options.
         * @param {Object} options  Available parameters:
         *                          {boolean} [showCurrentTime]
         */
        setOptions(options: any): void;

        /**
         * Repaint the component
         * @return {boolean} Returns true if the component is resized
         */
        redraw(): boolean;

        /**
         * Start auto refreshing the current time bar
         */
        start(): void;

        /**
         * Stop auto refreshing the current time bar
         */
        stop(): void;

        /**
         * Set a current time. This can be used for example to ensure that a client's
         * time is synchronized with a shared server time.
         * @param {Date | string | number} time     A Date, unix timestamp, or
         *                                          ISO date string.
         */
        setCurrentTime(time: any | string | number): void;

        /**
         * Get the current time.
         * @return {Date} Returns the current time.
         */
        getCurrentTime(): any;

    }

    /**
     * A custom time bar
     * @param {{range: Range, dom: Object}} body
     * @param {Object} [options]        Available parameters:
     *                                  {number | string} id
     *                                  {string} locales
     *                                  {string} locale
     * @prototype CustomTime
     * @constructor CustomTime
     */
    export class CustomTime {
        constructor(body: any, options?: any);

        /**
         * Set options for the component. Options will be merged in current options.
         * @param {Object} options  Available parameters:
         *                                  {number | string} id
         *                                  {string} locales
         *                                  {string} locale
         */
        setOptions(options: any): void;

        /**
         * Destroy the CustomTime bar
         */
        destroy(): void;

        /**
         * Repaint the component
         * @return {boolean} Returns true if the component is resized
         */
        redraw(): boolean;

        /**
         * Remove the CustomTime from the DOM
         */
        hide(): void;

        /**
         * Set custom time.
         * @param {Date | number | string} time
         */
        setCustomTime(time: any | number | string): void;

        /**
         * Retrieve the current custom time.
         * @return {Date} customTime
         */
        getCustomTime(): any;

        /**
         * Set custom title.
         * @param {Date | number | string} title
         */
        setCustomTitle(title: any | number | string): void;

        /**
         * Find a custom time from an event target:
         * searches for the attribute 'custom-time' in the event target's element tree
         * @param {Event} event
         * @return {CustomTime | null} customTime
         */
        static customTimeFromTarget(event: any): CustomTime | any;

    }

    /**
     * A horizontal time axis
     * @param {Object} body
     * @param {Object} options        See DataAxis.setOptions for the available
     *                                options.
     * @param {SVGElement} svg
     * @param {LineGraph.options} linegraphOptions
     * @prototype DataAxis
     * @extends Component
     */
    export function DataAxis(body: any, options: any, svg: any, linegraphOptions: any): void;

    /**
     * @param {number} start
     * @param {number} end
     * @param {boolean} autoScaleStart
     * @param {boolean} autoScaleEnd
     * @param {number} containerHeight
     * @param {number} majorCharHeight
     * @param {boolean} zeroAlign
     * @param {function} formattingFunction
     * @constructor DataScale
     */
    export class DataScale {
        constructor(start: number, end: number, autoScaleStart: boolean, autoScaleEnd: boolean, containerHeight: number, majorCharHeight: number, zeroAlign: boolean, formattingFunction: any);

    }

    /**
     * /**
     * @param {object} group            | the object of the group from the dataset
     * @param {string} groupId          | ID of the group
     * @param {object} options          | the default options
     * @param {array} groupsUsingDefaultStyles  | this array has one entree.
     *                                            It is passed as an array so it is passed by reference.
     *                                            It enumerates through the default styles
     * @constructor GraphGroup
     */
    export class GraphGroup {
        constructor(group: any, groupId: string, options: any, groupsUsingDefaultStyles: any);

        /**
         * this loads a reference to all items in this group into this group.
         * @param {array} items
         */
        setItems(items: any): void;

        /**
         * this is used for barcharts and shading, this way, we only have to calculate it once.
         * @param {number} pos
         */
        setZeroPosition(pos: number): void;

        /**
         * set the options of the graph group over the default options.
         * @param {Object} options
         */
        setOptions(options: any): void;

        /**
         * this updates the current group class with the latest group dataset entree, used in _updateGroup in linegraph
         * @param {Group} group
         */
        update(group: Group): void;

        /**
         * return the legend entree for this group.
         * @param {number} iconWidth
         * @param {number} iconHeight
         * @param {{svg: (*|Element), svgElements: Object, options: Object, groups: Array.<Object>}} framework
         * @param {number} x
         * @param {number} y
         * @returns {{icon: (*|Element), label: (*|string), orientation: *}}
         */
        getLegend(iconWidth: number, iconHeight: number, framework: any, x: number, y: number): any;

    }

    /**
     * @param {number | string} groupId
     * @param {Object} data
     * @param {ItemSet} itemSet
     * @constructor Group
     */
    export class Group {
        constructor(groupId: number | string, data: any, itemSet: (body: any, options?: any) => void);

        /**
         * Set the group data for this group
         * @param {Object} data   Group data, can contain properties content and className
         */
        setData(data: any): void;

        /**
         * Get the width of the group label
         * @return {number} width
         */
        getLabelWidth(): number;

        /**
         * Repaint this group
         * @param {{start: number, end: number}} range
         * @param {{item: {horizontal: number, vertical: number}, axis: number}} margin
         * @param {boolean} [forceRestack=false]  Force restacking of all items
         * @return {boolean} Returns true if the group is resized
         */
        redraw(range: any, margin: any, forceRestack?: boolean): boolean;

        /**
         * Show this group: attach to the DOM
         */
        show(): void;

        /**
         * Hide this group: remove from the DOM
         */
        hide(): void;

        /**
         * Add an item to the group
         * @param {Item} item
         */
        add(item: Item): void;

        /**
         * Remove an item from the group
         * @param {Item} item
         */
        remove(item: Item): void;

        /**
         * Remove an item from the corresponding DataSet
         * @param {Item} item
         */
        removeFromDataSet(item: Item): void;

        /**
         * Reorder the items
         */
        order(): void;

    }

    /**
     * An ItemSet holds a set of items and ranges which can be displayed in a
     * range. The width is determined by the parent of the ItemSet, and the height
     * is determined by the size of the items.
     * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} body
     * @param {Object} [options]      See ItemSet.setOptions for the available options.
     * @prototype
     * @extends Component
     */
    export function ItemSet(body: any, options?: any): void;

    /**
     * Legend for Graph2d
     * @param {Graph2d.body} body
     * @param {Graph2d.options} options
     * @param {number} side
     * @param {LineGraph.options} linegraphOptions
     * @constructor Legend
     * @extends Component
     */
    export class Legend extends Component {
        constructor(body: any, options: any, side: number, linegraphOptions: any);

        /**
         * Hide the component from the DOM
         */
        hide(): void;

        /**
         * Show the component in the DOM (when not already visible).
         */
        show(): void;

    }

    /**
     * This is the constructor of the LineGraph. It requires a Timeline body and options.
     * @param {Timeline.body} body
     * @param {Object} options
     * @constructor LineGraph
     * @extends Component
     */
    export class LineGraph extends Component {
        constructor(body: any, options: any);

        /**
         * Create the HTML DOM for the ItemSet
         */
        _create(): void;

        /**
         * set the options of the LineGraph. the mergeOptions is used for subObjects that have an enabled element.
         * @param {object} options
         */
        setOptions(options: any): void;

        /**
         * Hide the component from the DOM
         */
        hide(): void;

        /**
         * Show the component in the DOM (when not already visible).
         */
        show(): void;

        /**
         * Set items
         * @param {DataSet | null} items
         */
        setItems(items: DataSet | any): void;

        /**
         * Set groups
         * @param {DataSet} groups
         */
        setGroups(groups: DataSet): void;

        /**
         * Redraw the component, mandatory function
         * @return {boolean} Returns true if the component is resized
         */
        redraw(): boolean;

    }

    /**
     * A horizontal time axis
     * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} body
     * @param {Object} [options]        See TimeAxis.setOptions for the available
     *                                  options.
     * @constructor TimeAxis
     * @extends Component
     */
    export class TimeAxis extends Component {
        constructor(body: any, options?: any);

        /**
         * Set options for the TimeAxis.
         * Parameters will be merged in current options.
         * @param {Object} options  Available options:
         *                          {string} [orientation.axis]
         *                          {boolean} [showMinorLabels]
         *                          {boolean} [showMajorLabels]
         */
        setOptions(options: any): void;

        /**
         * Create the HTML DOM for the TimeAxis
         */
        _create(): void;

        /**
         * Destroy the TimeAxis
         */
        destroy(): void;

        /**
         * Repaint the component
         * @return {boolean} Returns true if the component is resized
         */
        redraw(): boolean;

    }

    /**
     * @param {GraphGroup.id} groupId
     * @param {Object} options   // TODO: Describe options
     * @constructor Bargraph
     */
    export class Bargraph {
        constructor(groupId: any, options: any);

        /**
         * draw a bar graph
         * @param {Array.<GraphGroup.id>} groupIds
         * @param {Object} processedGroupData
         * @param {{svg: Object, svgElements: Array.<Object>, options: Object, groups: Array.<Group>}} framework
         */
        static draw(groupIds: any[], processedGroupData: any, framework: any): void;

    }

    /**
     * @param {GraphGroup.id} groupId
     * @param {Object} options   // TODO: Describe options
     * @constructor Line
     */
    export class Line {
        constructor(groupId: any, options: any);

        /**
         * draw a line graph
         * @param {Array.<Object>} pathArray
         * @param {Group} group
         * @param {{svg: Object, svgElements: Array.<Object>, options: Object, groups: Array.<Group>}} framework
         */
        static draw(pathArray: any[], group: Group, framework: any): void;

    }

    /**
     * @param {number | string} groupId
     * @param {Object} options   // TODO: Describe options
     * @constructor Points
     */
    export class Points {
        constructor(groupId: number | string, options: any);

        /**
         * draw the data points
         * @param {Array} dataset
         * @param {GraphGroup} group
         * @param {Object} framework            | SVG DOM element
         * @param {number} [offset]
         */
        static draw(dataset: any, group: GraphGroup, framework: any, offset?: number): void;

    }

    /**
     * @param {Group} group
     * @param {any} callbackResult
     * @returns {{style: *, styles: (*|string), size: *, className: *}}
     */
    export function getGroupTemplate(group: Group, callbackResult: any): any;

    /**
     * @param {Object} framework            | SVG DOM element
     * @param {Group} group
     * @returns {function}
     */
    export function getCallback(framework: any, group: Group): any;

    /**
     * @param {Object} data             Object containing parameters start, end
     *                                  content, className.
     * @param {{toScreen: function, toTime: function}} conversion
     *                                  Conversion functions from time to screen and vice versa
     * @param {Object} [options]        Configuration options
     * @todo describe options
     * @todo implement support for the BackgroundItem just having a start, then being displayed as a sort of an annotation
     * @prototype BackgroundItem
     * @extends Item
     */
    export function BackgroundItem(data: any, conversion: any, options?: any): void;

    /**
     * @constructor BoxItem
     * @extends Item
     * @param {Object} data             Object containing parameters start
     *                                  content, className.
     * @param {{toScreen: function, toTime: function}} conversion
     *                                  Conversion functions from time to screen and vice versa
     * @param {Object} [options]        Configuration options
     *                                  // TODO: describe available options
     */
    export class BoxItem extends Item {
        constructor(data: any, conversion: any, options?: any);

        /**
         * Check whether this item is visible inside given range
         * @param {{start: number, end: number}} range with a timestamp for start and end
         * @returns {boolean} True if visible
         */
        isVisible(range: any): boolean;

        /**
         * Repaint the item
         */
        redraw(): void;

        /**
         * Show the item in the DOM (when not already displayed). The items DOM will
         * be created when needed.
         */
        show(): void;

        /**
         * Hide the item from the DOM (when visible)
         */
        hide(): void;

        /**
         * Return the width of the item left from its start date
         * @return {number}
         */
        getWidthLeft(): number;

        /**
         * Return the width of the item right from its start date
         * @return {number}
         */
        getWidthRight(): number;

    }

    /**
     * @constructor Item
     * @param {Object} data             Object containing (optional) parameters type,
     *                                  start, end, content, group, className.
     * @param {{toScreen: function, toTime: function}} conversion
     *                                  Conversion functions from time to screen and vice versa
     * @param {Object} options          Configuration options
     *                                  // TODO: describe available options
     */
    export class Item {
        constructor(data: any, conversion: any, options: any);

        /**
         * Select current item
         */
        select(): void;

        /**
         * Unselect current item
         */
        unselect(): void;

        /**
         * Set data for the item. Existing data will be updated. The id should not
         * be changed. When the item is displayed, it will be redrawn immediately.
         * @param {Object} data
         */
        setData(data: any): void;

        /**
         * Set a parent for the item
         * @param {Group} parent
         */
        setParent(parent: Group): void;

        /**
         * Check whether this item is visible inside given range
         * @param {Range} range with a timestamp for start and end
         * @returns {boolean} True if visible
         */
        isVisible(range: () => void): boolean;

        /**
         * Show the Item in the DOM (when not already visible)
         * @return {Boolean} changed
         */
        show(): any;

        /**
         * Hide the Item from the DOM (when visible)
         * @return {Boolean} changed
         */
        hide(): any;

        /**
         * Repaint the item
         */
        redraw(): void;

        /**
         * Reposition the Item horizontally
         */
        repositionX(): void;

        /**
         * Reposition the Item vertically
         */
        repositionY(): void;

        /**
         * Repaint a drag area on the center of the item when the item is selected
         * @protected
         */
        protected _repaintDragCenter(): void;

        /**
         * Repaint a delete button on the top right of the item when the item is selected
         * @param {HTMLElement} anchor
         * @protected
         */
        protected _repaintDeleteButton(anchor: any): void;

        /**
         * Repaint a onChange tooltip on the top right of the item when the item is selected
         * @param {HTMLElement} anchor
         * @protected
         */
        protected _repaintOnItemUpdateTimeTooltip(anchor: any): void;

        /**
         * Update the editability of this item.
         */
        _updateEditStatus(): void;

        /**
         * Return the width of the item left from its start date
         * @return {number}
         */
        getWidthLeft(): number;

        /**
         * Return the width of the item right from the max of its start and end date
         * @return {number}
         */
        getWidthRight(): number;

        /**
         * Return the title of the item
         * @return {string | undefined}
         */
        getTitle(): string | any;

    }

    /**
     * @constructor PointItem
     * @extends Item
     * @param {Object} data             Object containing parameters start
     *                                  content, className.
     * @param {{toScreen: function, toTime: function}} conversion
     *                                  Conversion functions from time to screen and vice versa
     * @param {Object} [options]        Configuration options
     *                                  // TODO: describe available options
     */
    export class PointItem extends Item {
        constructor(data: any, conversion: any, options?: any);

        /**
         * Check whether this item is visible inside given range
         * @param {{start: number, end: number}} range with a timestamp for start and end
         * @returns {boolean} True if visible
         */
        isVisible(range: any): boolean;

        /**
         * Repaint the item
         */
        redraw(): void;

        /**
         * Show the item in the DOM (when not already visible). The items DOM will
         * be created when needed.
         */
        show(): void;

        /**
         * Hide the item from the DOM (when visible)
         */
        hide(): void;

        /**
         * Return the width of the item left from its start date
         * @return {number}
         */
        getWidthLeft(): number;

        /**
         * Return the width of the item right from  its start date
         * @return {number}
         */
        getWidthRight(): number;

    }

    /**
     * @constructor RangeItem
     * @extends Item
     * @param {Object} data             Object containing parameters start, end
     *                                  content, className.
     * @param {{toScreen: function, toTime: function}} conversion
     *                                  Conversion functions from time to screen and vice versa
     * @param {Object} [options]        Configuration options
     *                                  // TODO: describe options
     */
    export class RangeItem extends Item {
        constructor(data: any, conversion: any, options?: any);

        /**
         * Check whether this item is visible inside given range
         * @param {Range} range with a timestamp for start and end
         * @returns {boolean} True if visible
         */
        isVisible(range: () => void): boolean;

        /**
         * Repaint the item
         */
        redraw(): void;

        /**
         * Show the item in the DOM (when not already visible). The items DOM will
         * be created when needed.
         */
        show(): void;

        /**
         * Hide the item from the DOM (when visible)
         */
        hide(): void;

        /**
         * Repaint a drag area on the left side of the range when the range is selected
         * @protected
         */
        protected _repaintDragLeft(): void;

        /**
         * Repaint a drag area on the right side of the range when the range is selected
         * @protected
         */
        protected _repaintDragRight(): void;

    }

    /**
     * Test whether given object is a number
     * @param {*} object
     * @return {Boolean} isNumber
     */
    export function isNumber(object: any): any;

    /**
     * Remove everything in the DOM object
     * @param {Element} DOMobject
     */
    export function recursiveDOMDelete(DOMobject: any): void;

    /**
     * this function gives you a range between 0 and 1 based on the min and max values in the set, the total sum of all values and the current value.
     * @param {number} min
     * @param {number} max
     * @param {number} total
     * @param {number} value
     * @returns {number}
     */
    export function giveRange(min: number, max: number, total: number, value: number): number;

    /**
     * Test whether given object is a string
     * @param {*} object
     * @return {Boolean} isString
     */
    export function isString(object: any): any;

    /**
     * Test whether given object is a Date, or a String containing a Date
     * @param {Date | String} object
     * @return {Boolean} isDate
     */
    export function isDate(object: any | any): any;

    /**
     * Create a semi UUID
     * source: http://stackoverflow.com/a/105074/1262753
     * @return {string} uuid
     */
    export function randomUUID(): string;

    /**
     * assign all keys of an object that are not nested objects to a certain value (used for color objects).
     * @param {object} obj
     * @param {number} value
     */
    export function assignAllKeys(obj: any, value: number): void;

    /**
     * Fill an object with a possibly partially defined other object. Only copies values if the a object has an object requiring values.
     * That means an object is not created on a property if only the b object has it.
     * @param {object} a
     * @param {object} b
     * @param {boolean} [allowDeletion=false]
     */
    export function fillIfDefined(a: any, b: any, allowDeletion?: boolean): void;

    /**
     * Extend object a with the properties of object b or a series of objects
     * Only properties with defined values are copied
     * @param {Object} a
     * @param {...Object} b
     * @return {Object} a
     */
    export function protoExtend(a: any, ...b: any[]): any;

    /**
     * Extend object a with the properties of object b or a series of objects
     * Only properties with defined values are copied
     * @param {Object} a
     * @param {...Object} b
     * @return {Object} a
     */
    export function extend(a: any, ...b: any[]): any;

    /**
     * Extend object a with selected properties of object b or a series of objects
     * Only properties with defined values are copied
     * @param {Array.<string>} props
     * @param {Object} a
     * @param {Object} b
     * @return {Object} a
     */
    export function selectiveExtend(props: string[], a: any, b: any): any;

    /**
     * Extend object a with selected properties of object b or a series of objects
     * Only properties with defined values are copied
     * @param {Array.<string>} props
     * @param {Object} a
     * @param {Object} b
     * @param {boolean} [allowDeletion=false]
     * @return {Object} a
     */
    export function selectiveDeepExtend(props: string[], a: any, b: any, allowDeletion?: boolean): any;

    /**
     * Extend object a with selected properties of object b or a series of objects
     * Only properties with defined values are copied
     * @param {Array.<string>} props
     * @param {Object} a
     * @param {Object} b
     * @param {boolean} [allowDeletion=false]
     * @return {Object} a
     */
    export function selectiveNotDeepExtend(props: string[], a: any, b: any, allowDeletion?: boolean): any;

    /**
     * Deep extend an object a with the properties of object b
     * @param {Object} a
     * @param {Object} b
     * @param {boolean} [protoExtend]   --> optional parameter. If true, the prototype values will also be extended.
     *                                    (ie. the options objects that inherit from others will also get the inherited options)
     * @param {boolean} [allowDeletion] --> optional parameter. If true, the values of fields that are null will be deleted
     * @returns {Object}
     */
    export function deepExtend(a: any, b: any, protoExtend?: boolean, allowDeletion?: boolean): any;

    /**
     * Test whether all elements in two arrays are equal.
     * @param {Array} a
     * @param {Array} b
     * @return {boolean} Returns true if both arrays have the same length and same
     *                   elements.
     */
    export function equalArray(a: any, b: any): boolean;

    /**
     * Convert an object to another type
     * @param {boolean | number | string | Date | Moment | Null | undefined} object
     * @param {string | undefined} type   Name of the type. Available types:
     *                                    'Boolean', 'Number', 'String',
     *                                    'Date', 'Moment', ISODate', 'ASPDate'.
     * @return {*} object
     * @throws Error
     */
    export function convert(object: boolean | number | string | any | any | any | any, type: string | any): any;

    /**
     * Get the type of an object, for example exports.getType([]) returns 'Array'
     * @param {*} object
     * @return {string} type
     */
    export function getType(object: any): string;

    /**
     * Used to extend an array and copy it. This is used to propagate paths recursively.
     * @param {Array} arr
     * @param {*} newValue
     * @returns {Array}
     */
    export function copyAndExtendArray(arr: any, newValue: any): any;

    /**
     * Used to extend an array and copy it. This is used to propagate paths recursively.
     * @param {Array} arr
     * @returns {Array}
     */
    export function copyArray(arr: any): any;

    /**
     * Retrieve the absolute left value of a DOM element
     * @param {Element} elem        A dom element, for example a div
     * @return {number} left        The absolute left position of this element
     *                              in the browser page.
     */
    export function getAbsoluteLeft(elem: any): number;

    /**
     * Retrieve the absolute top value of a DOM element
     * @param {Element} elem        A dom element, for example a div
     * @return {number} top        The absolute top position of this element
     *                              in the browser page.
     */
    export function getAbsoluteTop(elem: any): number;

    /**
     * add a className to the given elements style
     * @param {Element} elem
     * @param {string} classNames
     */
    export function addClassName(elem: any, classNames: string): void;

    /**
     * add a className to the given elements style
     * @param {Element} elem
     * @param {string} classNames
     */
    export function removeClassName(elem: any, classNames: string): void;

    /**
     * For each method for both arrays and objects.
     * In case of an array, the built-in Array.forEach() is applied.
     * In case of an Object, the method loops over all properties of the object.
     * @param {Object | Array} object   An Object or Array
     * @param {function} callback       Callback method, called for each item in
     *                                  the object or array with three parameters:
     *                                  callback(value, index, object)
     */
    export function forEach(object: any | any, callback: any): void;

    /**
     * Convert an object into an array: all objects properties are put into the
     * array. The resulting array is unordered.
     * @param {Object} object
     * @returns {Array} array
     */
    export function toArray(object: any): any;

    /**
     * Update a property in an object
     * @param {Object} object
     * @param {string} key
     * @param {*} value
     * @return {Boolean} changed
     */
    export function updateProperty(object: any, key: string, value: any): any;

    /**
     * Throttle the given function to be only executed once per animation frame
     * @param {function} fn
     * @returns {function} Returns the throttled function
     */
    export function throttle(fn: any): any;

    /**
     * Add and event listener. Works for all browsers
     * @param {Element}     element    An html element
     * @param {string}      action     The action, for example "click",
     *                                 without the prefix "on"
     * @param {function}    listener   The callback function to be executed
     * @param {boolean}     [useCapture]
     */
    export function addEventListener(element: any, action: string, listener: any, useCapture?: boolean): void;

    /**
     * Remove an event listener from an element
     * @param {Element}     element         An html dom element
     * @param {string}      action          The name of the event, for example "mousedown"
     * @param {function}    listener        The listener function
     * @param {boolean}     [useCapture]
     */
    export function removeEventListener(element: any, action: string, listener: any, useCapture?: boolean): void;

    /**
     * Cancels the event if it is cancelable, without stopping further propagation of the event.
     * @param {Event} event
     */
    export function preventDefault(event: any): void;

    /**
     * Get HTML element which is the target of the event
     * @param {Event} event
     * @return {Element} target element
     */
    export function getTarget(event: any): any;

    /**
     * Check if given element contains given parent somewhere in the DOM tree
     * @param {Element} element
     * @param {Element} parent
     * @returns {boolean}
     */
    export function hasParent(element: any, parent: any): boolean;

    /**
     * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param {string} hex
     * @returns {{r: *, g: *, b: *}} | 255 range
     */
    export function hexToRGB(hex: string): any;

    /**
     * This function takes color in hex format or rgb() or rgba() format and overrides the opacity. Returns rgba() string.
     * @param {string} color
     * @param {number} opacity
     * @returns {String}
     */
    export function overrideOpacity(color: string, opacity: number): any;

    /**
     * @param {number} red     0 -- 255
     * @param {number} green   0 -- 255
     * @param {number} blue    0 -- 255
     * @returns {String}
     * @constructor
     */
    export class RGBToHex {
        constructor(red: number, green: number, blue: number);

    }

    /**
     * Parse a color property into an object with border, background, and
     * highlight colors
     * @param {Object | String} color
     * @return {Object} colorObject
     */
    export function parseColor(color: any | any): any;

    /**
     * http://www.javascripter.net/faq/rgb2hsv.htm
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @returns {{h: number, s: number, v: number}}
     * @constructor
     */
    export class RGBToHSV {
        constructor(red: number, green: number, blue: number);

    }

    /**
     * Append a string with css styles to an element
     * @param {Element} element
     * @param {string} cssText
     */
    export function addCssText(element: any, cssText: string): void;

    /**
     * Remove a string with css styles from an element
     * @param {Element} element
     * @param {string} cssText
     */
    export function removeCssText(element: any, cssText: string): void;

    /**
     * https://gist.github.com/mjijackson/5311256
     * @param {number} h
     * @param {number} s
     * @param {number} v
     * @returns {{r: number, g: number, b: number}}
     * @constructor
     */
    export class HSVToRGB {
        constructor(h: number, s: number, v: number);

    }

    /**
     * This recursively redirects the prototype of JSON objects to the referenceObject
     * This is used for default options.
     * @param {Array.<string>} fields
     * @param {Object} referenceObject
     * @returns {*}
     */
    export function selectiveBridgeObject(fields: string[], referenceObject: any): any;

    /**
     * This recursively redirects the prototype of JSON objects to the referenceObject
     * This is used for default options.
     * @param {Object} referenceObject
     * @returns {*}
     */
    export function bridgeObject(referenceObject: any): any;

    /**
     * This method provides a stable sort implementation, very fast for presorted data
     * @param {Array} a the array
     * @param {function} compare an order comparator
     * @returns {Array}
     */
    export function insertSort(a: any, compare: any): any;

    /**
     * This is used to set the options of subobjects in the options object.
     * A requirement of these subobjects is that they have an 'enabled' element
     * which is optional for the user but mandatory for the program.
     * The added value here of the merge is that option 'enabled' is set as required.
     * @param {object} mergeTarget   | either this.options or the options used for the groups.
     * @param {object} options       | options
     * @param {string} option        | option key in the options argument
     * @param {object} globalOptions | global options, passed in to determine value of option 'enabled'
     */
    export function mergeOptions(mergeTarget: any, options: any, option: string, globalOptions: any): void;

}

declare module 'vis' {
    export = vis;
}