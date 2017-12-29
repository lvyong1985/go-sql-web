(function () {
    $.executeQueryAjax = function (sql, resultId) {
        $.ajax({
            type: 'POST',
            url: pathname + "/query",
            data: {tid: activeMerchantId, sql: sql},
            success: function (content, textStatus, request) {
                $.tableCreate(content, sql, resultId)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\nStatus: " + textStatus + "\nError: " + errorThrown)
            }
        })
        $.hideTablesDiv()
    }


    $.executeUpdate = function (sqlRowIndices, sqls, $rows) {
        $.ajax({
            type: 'POST',
            url: pathname + "/update",
            data: {tid: activeMerchantId, sqls: sqls},
            success: function (content, textStatus, request) {
                if (!content.Ok) {
                    alert(content.Message)
                    return
                }

                for (var i = 0; i < content.RowsResult.length; ++i) {
                    var rowResult = content.RowsResult[i]
                    if (!rowResult.Ok) {
                        alert(rowResult.Message)
                    } else {
                        var rowIndex = sqlRowIndices[i]
                        var $row = $($rows[rowIndex])

                        $row.find('td.dataCell').each(function (jndex, cell) {
                            $(this).removeAttr('old').removeClass('changedCell')
                        })
                        $row.find('input[type=checkbox]').prop('checked', false)
                        $row.remove('.deletedRow').removeClass('clonedRow')
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\nStatus: " + textStatus + "\nError: " + errorThrown)
            }
        })
    }
})()