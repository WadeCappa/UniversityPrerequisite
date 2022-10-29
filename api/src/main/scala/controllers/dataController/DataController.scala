package controllers.dataController
import Views.DataViews
import apiData.DBManager

object DataController {
  def generateViews(dbManager: DBManager): DataViews = {
    DataViews(dbManager)
  }
}
